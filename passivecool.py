"""Usage:
  passivecool.py [--host=0.0.0.0] [--port=5000] [--mock_arduino]
  passivecool.py -h | --help | --version
"""

import collections
from docopt import docopt
import requests
import random

from flask import Flask
from flask import abort, redirect
from flask.ext import restful
from flask.ext.restful import reqparse

app = Flask(__name__, static_url_path='/www', static_folder='./static/passivecool/www' )
api = restful.Api(app)

args = {}

def mock_arduino():
    import random
    return {
            'temperature': random.randint(60, 90),
            'humidity': random.randint(40, 90) + random.randint(0,99)/100.0,
            'light_level': random.randint(0,1023),
            'position': random.randint(0,90)
    }

class StatusApi(restful.Resource):
    def get(self):
        if args.get('--mock_arduino'):
            json = mock_arduino() 
        else:
            json = requests.get('http://passivecool.local/arduino/state').json()
        print json
        return json

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('position', type=int, help='Angle to set the blinds 0-90')
        req = parser.parse_args()
        if args.get('--mock_arduino'):
            print "Changing position to %s" % req['position']
        else:
            resp = requests.get('http://passivecool.local/arduino/state/%s' % req['position'])
        return {}


@app.route('/')
def index():
    return redirect('/www/index.html')

api.add_resource(StatusApi, '/api/status')

if __name__ == '__main__':
    args = docopt(__doc__, version='0.1')
    app.run(host=args['--host'] or '0.0.0.0', port=int(args['--port']))
