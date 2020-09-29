from flask import Flask, request
import requests
from utils import getCloudNames

app = Flask(__name__)

@app.route('/api/v1/clouds', methods=['GET'])

def getClouds():

  cloud_response_aiven = requests.get('https://api.aiven.io/v1/clouds').json()

  # Get the cloud names from config and create a dictionary of available keys
  cloud_list = {}
  cloud_config = getCloudNames()
  for k in cloud_config:
    cloud_list[k] = {
      'platform': cloud_config[k],
      'cloud_instances': []
    }

  # 1. Loop over the list and create a dict to hold specific cloud information
  #     Create a abreviation from the avilable cloud names, i.e, @cloud_abr
  # 2. Check if the cloud name abreviation is in cloud_list
  #     if present, add the new instance in the key instance
  #     if not, create the key and the new key instance to key instance and add the platform
  for cloud in cloud_response_aiven['clouds']:
    cloud_abr = cloud['cloud_name'].split('-')[0]
    if cloud_abr in cloud_list:
      cloud_list[cloud_abr]['cloud_instances'].append(cloud)
    else:
      cloud_list[cloud_abr]['platform'] = cloud_config[cloud_abr]
      cloud_list[cloud_abr]['cloud_instances'] = cloud

  return cloud_list

if __name__ == "__main__":
  app.run(debug=True)