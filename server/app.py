from flask import Flask, request
import requests
from utils import getCloudNames, getDistanceAndSort
from flask_caching import Cache

cache = Cache()

app = Flask(__name__)

app.config['CACHE_TYPE'] = 'simple'

cache.init_app(app)


# Get the available clouds data from the primary source and cache it.
@cache.cached(timeout=60*60) # 60 mins cache
def getAivenClouds():
  return requests.get('https://api.aiven.io/v1/clouds').json()


# This method returns the cloud data with respect to
# provider: e.g: aws, google
# regions: e.g: regions available for the platform
# distance: either nearest_first or farthest_first, @default:- nearest_first
@app.route('/api/v1/clouds', methods=['GET'])
def getCloudsPerProvider():

  cloud_response_aiven = getAivenClouds()

  provider = request.args.get('provider')
  region = request.args.get('region')
  lat = request.args.get('lat')
  lng = request.args.get('lng')
  direction = request.args.get('direction')

  response = {
    "abreviation": "",
    "provider": "",
    "cloud_instances": []
  }

  # Get the list of clouds as per provider
  for cloud in cloud_response_aiven['clouds']:
    cloud_abr = cloud['cloud_name'].split('-')[0]

    if cloud_abr.lower() == provider.lower():
      response['abreviation'] = provider.lower()
      response['provider'] = getCloudNames(provider.lower())
      response['cloud_instances'].append(cloud)

  # update response as per selected region
  if region is not None:
    result = list(filter(lambda reg: reg['geo_region'] == region, response['cloud_instances']))
    response['cloud_instances'] = result

  # Update response as per distance filter applied
  if lat is not None and lng is not None:
    provided_coordinate = (float(lat), float(lng))
    response['cloud_instances'] = getDistanceAndSort(response['cloud_instances'], provided_coordinate, direction)

  return response


if __name__ == "__main__":
  app.run(debug=True)