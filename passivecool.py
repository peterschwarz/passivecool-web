import requests
import random

from flask import Flask
from flask import abort, redirect
from flask.ext import restful

app = Flask(__name__, static_url_path='/www', static_folder='./static/passivecool/www' )
api = restful.Api(app)


class StatusApi(restful.Resource):
    def get(self):
        json = requests.get('http://passivecool.local/arduino/state').json()
        print json
        return json

    def put(self, position):
        #resp = requests.get('http://passivecool.local/arduino/state/%s' % position)
        print position
        return {}


@app.route("/")
def index():
    return redirect("/www/index.html")

api.add_resource(StatusApi, '/api/status')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
