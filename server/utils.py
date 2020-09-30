import os
import json
from geopy.distance import geodesic


def getCloudNames(key):

  with open('./cloud_config.json', 'r') as jsonfile:
    cloud_names = json.loads(jsonfile.read())
  
  return cloud_names[key]


# With respect to this beautiful explanation:
# https://janakiev.com/blog/gps-points-distance-python/
# Will be using the @geodesic from "geopy library" to calculate more accurate distances
def getDistanceAndSort(data, provided_coordinate, direction):
  for instance in data:
      region_geo_cord_tuple = (
        float(instance['geo_latitude']),
        float(instance['geo_longitude'])
      )
      instance['distance'] = geodesic(provided_coordinate, region_geo_cord_tuple).miles
  
  isReverse = True if direction == 'farthest_first' else False
  
  return sorted( data, key=lambda k: k['distance'], reverse=isReverse )