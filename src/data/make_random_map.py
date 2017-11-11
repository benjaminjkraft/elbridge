#!/usr/bin/env python
import json
import math
import random
import sys

DOTS_PER_CELL = 10
RESOLUTION = 100
MARGIN = 0.05
BOUNDS = (int(RESOLUTION * MARGIN), RESOLUTION - int(RESOLUTION * MARGIN) + 1)

MAP_FILE_TEMPLATE = """\
// %(cmd)s
export default %(json)s;
"""


def grid_cell(x, y, dx, dy, party):
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
        'precincts': [grid_cell(i, j, 1, 1, "R" if (i, j) in r_ixs else "D")
                      for i, j in ixs],
    }


def split_list(l, index, res):
    """Split l into two parts, sorted by index'th item, multiple of res."""
    l.sort(key=lambda i: i[index])
    # Split the region in half-ish by area, then round to the nearest multiple
    # of res dots, clamping inwards.
    cutpoint = (l[0][index] + l[-1][index]) * (1 / 3. + random.random() / 3.)
    left_size = len([i for i in l if i[index] < cutpoint])
    left_size = clamp(int(round(left_size / res)) * res, res, len(l) - res)
    cutpoint = (l[left_size - 1][index] + l[left_size][index]) / 2.
    return cutpoint, l[:left_size], l[left_size:]


def make_precincts_from_chunks(chunks, res=DOTS_PER_CELL):
    """Make precincts from a list of chunks and dots.

    Takes a list of chunks, each of which should be (x, y, dx, dy, dots), with
    a multiple of 'res' dots; returns a list of the same, with exactly 'res'
    dots in each chunk.
    """
    final_chunks = []
    while chunks:
        next_chunks = []
        for chunk in chunks:
            x, y, dx, dy, dots = chunk
            if len(dots) == res:
                final_chunks.append(chunk)
                continue
            if dx < dy or dx == dy and random.randrange(2):
                cut, left, right = split_list(dots, 1, res)
                next_chunks.extend([
                    (x, y, dx, cut - y, left),
                    (x, cut, dx, y + dy - cut, right)])
            else:
                cut, left, right = split_list(dots, 0, res)
                next_chunks.extend([
                    (x, y, cut - x, dy, left),
                    (cut, y, x + dx - cut, dy, right)])
        chunks = next_chunks
    return final_chunks


def clamp(val, low, high):
    return min(high, max(low, val))


def fuzzy_clamp(val, low, high, margin):
    clamped = clamp(val, low + margin, high - margin)
    return clamped + (2 * random.random() - 1) * margin


def fudge_dots(precinct, margin=MARGIN):
    x, y, dx, dy, dots = precinct
    new_dots = [
        (fuzzy_clamp(a, x + margin * dx, x + (1 - margin) * dx, margin * dx),
         fuzzy_clamp(b, y + margin * dy, y + (1 - margin) * dy, margin * dy))
        for a, b in dots]
    return x, y, dx, dy, new_dots


def make_single_city_map(width, height, num_precincts, num_districts,
                         city_precincts, city_size, city_r):
    base_dots = [
        ((random.randrange(*BOUNDS) / float(RESOLUTION)) * width,
         (random.randrange(*BOUNDS) / float(RESOLUTION)) * height)
        for _ in xrange(DOTS_PER_CELL * (num_precincts - city_precincts))]
    city_dots = [
        (clamp(random.gauss(width / 2., city_size), 0, width),
         clamp(random.gauss(height / 2., city_size), 0, height))
        for _ in xrange(DOTS_PER_CELL * city_precincts)]
    precincts = map(fudge_dots, make_precincts_from_chunks(
        [(0, 0, float(width), float(height), base_dots + city_dots)]))

    def dist_from_center(precinct):
        x, y, dx, dy, _ = precinct
        return (x + dx / 2 - width / 2) ** 2 + (y + dy / 2 - height / 2) ** 2

    precincts.sort(key=dist_from_center)
    city_r_count = int(city_precincts * city_r)
    r_indexes = (set(random.sample(xrange(city_precincts), city_r_count))
                 | set(random.sample(xrange(city_precincts, num_precincts),
                                     num_precincts / 2 - city_r_count)))
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
    print MAP_FILE_TEMPLATE % {
        'cmd': ' '.join(sys.argv),
        'json': json.dumps(m, indent=2, sort_keys=True),
    }


def main(map_type, args):
    map_maker = globals()['make_%s_map' % map_type]
    echo_map(map_maker(*[float(arg) if '.' in arg else int(arg)
                         for arg in args]))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2:])
