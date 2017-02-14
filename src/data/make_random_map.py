#!/usr/bin/env python
import json
import random
import sys

DOTS_PER_CELL = 10
RESOLUTION = 100
MARGIN = 0.05
BOUNDS = (int(RESOLUTION * MARGIN), RESOLUTION - int(RESOLUTION * MARGIN) + 1)

def make_cell(x, y, party):
    return {
        "x": x,
        "y": y,
        "width": 1,
        "height": 1,
        "party": party,
        "dots": sorted({
            "x": x + random.randrange(*BOUNDS) / float(RESOLUTION),
            "y": y + random.randrange(*BOUNDS) / float(RESOLUTION),
        } for _ in xrange(DOTS_PER_CELL))
    }

def make_grid(width, height):
    ixs = [(i, j) for j in xrange(height) for i in xrange(width)]
    r_ixs = set(random.sample(ixs, len(ixs)/2))
    return [make_cell(i, j, "R" if (i, j) in r_ixs else "D") for i, j in ixs]

def echo_grid(grid):
    print "export default %s" % json.dumps(grid, indent=2, sort_keys=True)

def main():
    echo_grid(make_grid(int(sys.argv[1]), int(sys.argv[2])))

if __name__ == '__main__':
    main()
