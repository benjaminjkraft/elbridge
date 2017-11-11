import os
import sys

sys.path.insert(0, 'lib')

import flask
from google.appengine.ext import ndb

app = flask.Flask(__name__)
app.config.update(
    DEBUG=os.environ.get('SERVER_SOFTWARE').startswith('Development'))


class SharedMap(ndb.Model):
    name = ndb.StringProperty()
    url = ndb.StringProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

    @staticmethod
    def recent(count=20):
        return SharedMap.query().order(-SharedMap.timestamp).fetch(count)


@app.route('/share', methods=['POST'])
def share():
    if 'url' not in flask.request.form:
        return 'Missing url', 400
    if 'name' not in flask.request.form:
        return 'Missing name', 400
    SharedMap(url=flask.request.form['url'],
              name=flask.request.form['name']).put()
    return '', 204


@app.route('/recent')
def list():
    count = max(flask.request.args.get('count', 20), 100)
    return flask.render_template('recent.html', maps=SharedMap.recent(count))
