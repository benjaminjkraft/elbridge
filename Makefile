# TODO: avoid duplicating these in backend dir.
PROJECT="elbridge-gerry"
PROD_URL="https://$(PROJECT).appspot.com"
DEV_PORT="8085"
DEV_URL="http://localhost:$(DEV_PORT)"

serve:
	cd backend ; $(MAKE) serve PORT=$(DEV_PORT) &
	REACT_APP_BACKEND="$(DEV_URL)" yarnpkg start

deploy:
	REACT_APP_BACKEND="$(PROD_URL)" yarnpkg run build
	git co gh-pages
	for i in $$(ls build) ; do cp -r build/$$i . ; git add $$i ; done
	git commit -m "Update of pages site"
	git push origin gh-pages
	git co master

deploy_backend:
	cd backend ; $(MAKE) deploy PROJECT=$(PROJECT)

test:
	yarnpkg run test

.PHONY: serve deploy deploy_backend test
