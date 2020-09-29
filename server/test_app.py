import unittest
import requests
import os
import json

class CloudApiTest(unittest.TestCase):

  with open('./mock_data.json', 'r') as jsonfile:
    mocked_cloud_data = json.loads(jsonfile.read())
  
  aiven_api = 'https://api.aiven.io/v1/clouds'

  base_url = 'http://localhost:5000/api/v1/clouds'
  platform_url = '{}?platform=aws'.format(base_url)
  platform_region_url = '{}?platform=aws&region=africa'.format(base_url)

  response_platform_uri = {
    "aws": {
      "cloud_instances": [
        {
          "cloud_description": "Africa, South Africa - Amazon Web Services: Cape Town",
          "cloud_name": "aws-af-south-1",
          "geo_latitude": -33.92,
          "geo_longitude": 18.42,
          "geo_region": "africa"
        },
        {
          "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
          "cloud_name": "aws-me-south-1",
          "geo_latitude": 26.07,
          "geo_longitude": 50.55,
          "geo_region": "south asia"
        },
      ]
    }
  }
  
  response_platform__region_uri = {
    "aws": {
      "cloud_instances": [
        {
          "cloud_description": "Africa, South Africa - Amazon Web Services: Cape Town",
          "cloud_name": "aws-af-south-1",
          "geo_latitude": -33.92,
          "geo_longitude": 18.42,
          "geo_region": "africa"
        }
      ]
    }
  }
  
  # Test if the endpoint is correct and respoding.
  def test_aiven_endpoint(self):
    r = requests.get(CloudApiTest.aiven_api)
    self.assertEqual(r.status_code, 200)

  # Get all instances for a particular cloud platform
  def test_get_clouds_platform(self):
    r = requests.get(CloudApiTest.platform_url)
    self.assertEqual(r.status_code, 200)
    self.assertDictEqual(r.json(), CloudApiTest.response_platform_uri)

  # Get instances for a particular cloud platform at a particular region
  def test_get_clouds_platform_region(self):
    r = requests.get(CloudApiTest.platform_region_url)
    self.assertEqual(r.status_code, 200)
    self.assertDictEqual(r.json(), CloudApiTest.response_platform__region_uri)

  # Get instances for a particular cloud platform at a particular region and nearest
  def test_get_clouds_platform_region_nearest(self):
    pass

if __name__ == "__main__":
  unittest.main()