MAP_SCRIPT=src/data/make_random_map.py

serve:
	yarnpkg start

build:
	yarnpkg run build

test:
	yarnpkg run test

src/data/GridMap.js: $(MAP_SCRIPT)
	$< grid 5 6 >$@

src/data/UnevenMap.js: $(MAP_SCRIPT)
	$< uneven 4 4 30 >$@

maps: src/data/GridMap.js src/data/UnevenMap.js

.PHONY: serve build test
