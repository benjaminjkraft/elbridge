#!/usr/bin/env python
import json
import math
import random
import sys

DOTS_PER_CELL = 10
RESOLUTION = 100
MARGIN = 0.05
BOUNDS = (int(RESOLUTION * MARGIN), RESOLUTION - int(RESOLUTION * MARGIN) + 1)


def make_cell(x, y, dx, dy, party):
    return {
        "x": x,
        "y": y,
        "width": dx,
        "height": dy,
        "party": party,
        "dots": sorted({
            "x": x + dx * random.randrange(*BOUNDS) / float(RESOLUTION),
            "y": y + dy * random.randrange(*BOUNDS) / float(RESOLUTION),
        } for _ in xrange(DOTS_PER_CELL))
    }


def make_grid_map(width, height, num_districts):
    ixs = [(i, j) for j in xrange(height) for i in xrange(width)]
    r_ixs = set(random.sample(ixs, len(ixs)/2))
    return {
        'width': width,
        'height': height,
        'numDistricts': num_districts,
        'precincts': [make_cell(i, j, 1, 1, "R" if (i, j) in r_ixs else "D")
                      for i, j in ixs],
    }


def make_uneven_map(width, height, num_precincts, num_districts):
    assert num_precincts >= width * height
    precincts = [(float(x), float(y), 1.0, 1.0)
                 for y in xrange(height) for x in xrange(width)]
    while len(precincts) < num_precincts:
        i = random.randrange(len(precincts))
        x, y, dx, dy = precincts[i]
        if random.randrange(2):
            precincts[i] = (x, y, dx / 2, dy)
            precincts.append((x + dx / 2, y, dx / 2, dy))
        else:
            precincts[i] = (x, y, dx, dy / 2)
            precincts.append((x, y + dy / 2, dx, dy / 2))
    r_indexes = set(random.sample(xrange(len(precincts)), len(precincts) / 2))
    return {
        'width': width,
        'height': height,
        'numDistricts': num_districts,
        'precincts': [
            make_cell(x, y, dx, dy, 'R' if i in r_indexes else 'D')
            for i, (x, y, dx, dy) in enumerate(precincts)],  # noqa: F812
    }


def factor_evenly(n):
    """Factor n into a * b with a and b kinda close, if possible."""
    sqrt_n = int(math.sqrt(n))
    for a in xrange(sqrt_n, int(sqrt_n * 0.7), -1):
        if n % a == 0:
            return (a, n / a)
    return None


def divide_unevenly(n, k):
    """Return a list with sum n, k elements, all approximately equal."""
    retval = [n / k + (i < n % k) for i in xrange(k)]
    random.shuffle(retval)
    return retval


def split_list(l, index, res):
    """Split l into two parts, sorted by index'th item, multiple of res."""
    l.sort(key=lambda i: i[index])
    left_size = len(l) / res / 2 * res
    cutpoint = (l[left_size - 1][index] + l[left_size][index]) / 2.
    return cutpoint, l[:left_size], l[left_size:]


def make_dots_first_map(width, height, num_precincts, num_districts,
                        chunk_size_min=6):
    num_chunks_max = num_precincts / chunk_size_min
    for i in xrange(num_chunks_max, 0, -1):
        factors = factor_evenly(i)  # guaranteed to work for i=1
        if factors:
            a, b = factors
            num_chunks = i
            break
    precincts_per_chunk = divide_unevenly(num_precincts, num_chunks)
    groups = []
    dx = width / float(a)
    dy = height / float(b)
    for i in xrange(a):
        for j in xrange(b):
            chunk_size = precincts_per_chunk.pop()
            dots = [
                ((i + random.randrange(*BOUNDS) / float(RESOLUTION)) * dx,
                 (j + random.randrange(*BOUNDS) / float(RESOLUTION)) * dy)
                for _ in xrange(DOTS_PER_CELL * chunk_size)]
            groups.append((i * dx, j * dy, dx, dy, dots))
    precincts = []
    while groups:
        next_groups = []
        for group in groups:
            x, y, dx, dy, dots = group
            if len(dots) == DOTS_PER_CELL:
                precincts.append(group)
                continue
            if dx < dy or dx == dy and random.randrange(2):
                cut, left, right = split_list(dots, 1, DOTS_PER_CELL)
                next_groups.extend([
                    (x, y, dx, cut - y, left),
                    (x, cut, dx, y + dy - cut, right)])
            else:
                cut, left, right = split_list(dots, 0, DOTS_PER_CELL)
                next_groups.extend([
                    (x, y, cut - x, dy, left),
                    (cut, y, x + dx - cut, dy, right)])
        groups = next_groups
    r_indexes = set(random.sample(xrange(len(precincts)), len(precincts) / 2))
    return {
        'width': width,
        'height': height,
        'numDistricts': num_districts,
        'precincts': [{
            'x': x, 'y': y, 'width': dx, 'height': dy,
            'party': 'R' if index in r_indexes else 'D',
            'dots': [{'x': i, 'y': j} for i, j in dots],
        } for index, (x, y, dx, dy, dots) in enumerate(precincts)]  # noqa: F812
    }


def echo_map(m):
    print "export default %s" % json.dumps(m, indent=2, sort_keys=True)


def main(map_type, args):
    map_maker = globals()['make_%s_map' % map_type]
    echo_map(map_maker(*map(int, args)))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2:])
