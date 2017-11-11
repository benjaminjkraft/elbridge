serve: deps
	dev_appserver.py app.yaml --admin_port 8005 --port $(PORT)

deploy: deps
	gcloud app deploy app.yaml --project $(PROJECT)

deps:
	pip install -t lib -r requirements.txt

.PHONY: deploy deps serve
