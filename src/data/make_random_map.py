#!/usr/bin/env python
import json
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

def make_grid_map(width, height):
    ixs = [(i, j) for j in xrange(height) for i in xrange(width)]
    r_ixs = set(random.sample(ixs, len(ixs)/2))
    return [make_cell(i, j, 1, 1, "R" if (i, j) in r_ixs else "D")
            for i, j in ixs]

def make_uneven_map(width, height, num_precincts):
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
    return [make_cell(x, y, dx, dy, 'R' if i in r_indexes else 'D')
            for i, (x, y, dx, dy) in enumerate(precincts)]

def echo_map(m):
    print "export default %s" % json.dumps(m, indent=2, sort_keys=True)

def main(map_type, args):
    map_maker = globals()['make_%s_map' % map_type]
    echo_map(map_maker(*map(int, args)))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2:])
