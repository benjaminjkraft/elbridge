MAP_SCRIPT=src/data/make_random_map.py

serve:
	yarnpkg start

build:
	yarnpkg run build

test:
	yarnpkg run test

src/data/GridMap.js: $(MAP_SCRIPT)
	$< grid 5 6 6 >$@

src/data/UnevenMap.js: $(MAP_SCRIPT)
	$< uneven 4 4 30 6 >$@

src/data/DotsFirstMap.js: $(MAP_SCRIPT)
	$< dots_first 4 6 30 6 >$@

.PHONY: serve build test
