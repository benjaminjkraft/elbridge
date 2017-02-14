serve:
	yarnpkg start

build:
	yarnpkg run build

test:
	yarnpkg run test

src/data/BaseMap.js: src/data/make_random_map.py
	src/data/make_random_map.py 4 6 >src/data/BaseMap.js

maps: src/data/BaseMap.js
