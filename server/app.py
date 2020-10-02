from flask import Flask, request, jsonify
import requests
from utils import getCloudNames, getDistanceAndSort
from flask_caching import Cache

cache = Cache()
app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config['CACHE_TYPE'] = 'simple'
cache.init_app(app)


# Returning the index.html file
@app.route('/')
def index():
  return app.send_static_file('index.html')

# Get the available clouds data from the primary source and cache it.
@cache.cached(timeout=60*60) # 60 mins cache
def getAivenClouds():
  return requests.get('https://api.aiven.io/v1/clouds').json()


# This method returns the cloud data with respect to
# provider: e.g: aws, google
# regions: e.g: regions available for the provider
# distance: either nearest_first or farthest_first, @default:- nearest_first
@app.route('/api/v1/clouds', methods=['GET'])
def getCloudsPerProvider():
  cloud_response_aiven = getAivenClouds()

  
  provider = request.args.get('provider')
  if provider is None:
    responseHashTable = {}
    response = []
    for cloud in cloud_response_aiven['clouds']:
      short_name = cloud['cloud_name'].split('-')[0]
      
      if short_name not in responseHashTable:
        responseHashTable[short_name] = short_name
        response.append({
          "short_name": short_name,
          "provider": getCloudNames(short_name)
        })

    return jsonify(response)

  response = {
    'short_name': '',
    'provider': '',
    'cloud_instances': [],
    'regions': []
  }

  # Get the list of regions as per provider
  for cloud in cloud_response_aiven['clouds']:
    short_name = cloud['cloud_name'].split('-')[0]

    if short_name.lower() == provider.lower():
      response['short_name'] = provider.lower()
      response['provider'] = getCloudNames(provider.lower())
      response['cloud_instances'].append(cloud)
      if cloud['geo_region'] not in response['regions']:
        response['regions'].append(cloud['geo_region'])

  # Collecting params
  region = request.args.get('region')
  lat = request.args.get('lat')
  lng = request.args.get('lng')
  direction = request.args.get('direction')
  

  # Show available clouds as per selected region and provider
  if region is not None:
    result = list(filter(lambda reg: reg['geo_region'] == region, response['cloud_instances']))
    response['cloud_instances'] = result

  # Update response as per distance filter applied
  if lat is not None and lng is not None:
    provided_coordinate = (float(lat), float(lng))
    response['cloud_instances'] = getDistanceAndSort(response['cloud_instances'], provided_coordinate, direction)

  return response


if __name__ == '__main__':
  app.run(debug=True)