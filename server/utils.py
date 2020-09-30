import os
import json

def getCloudNames(key):

  with open('../cloud_config.json', 'r') as jsonfile:
    cloud_names = json.loads(jsonfile.read())
  
  return cloud_names[key]