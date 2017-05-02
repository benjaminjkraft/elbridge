serve:
	yarnpkg start

deploy:
	yarnpkg run build
	git co gh-pages
	for i in $(ls build) ; do cp -r build/$$i . ; git add build/$$i ; done
	git commit -m "Update of pages site"
	git push origin gh-pages
	git co master

test:
	yarnpkg run test

.PHONY: serve build test
