import unittest
import requests
import os
import json
import app

class CloudApiTest(unittest.TestCase):
  maxDiff = None

  with open('./mock_data.json', 'r') as jsonfile:
    mocked_cloud_data = json.loads(jsonfile.read())
  
  aiven_api = 'https://api.aiven.io/v1/clouds'

  base_url = 'http://localhost:5000/api/v1/clouds'
  provider_url = '{}?provider=aws'.format(base_url)
  provider_region_url = '{}?provider=aws&region=africa'.format(base_url)

  response_provider_uri = {
    "abreviation": "aws",
    "provider": "Amazon Web Services",
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
      }
    ]
  }
  
  response_provider__region_uri = {
    "abreviation": "aws",
    "provider": "Amazon Web Services",
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
  
  # Test if the endpoint is correct and respoding.
  def test_aiven_endpoint(self):
    r = requests.get(CloudApiTest.aiven_api)
    self.assertEqual(r.status_code, 200)

  # Get all instances for a particular cloud provider
  def test_get_clouds_provider(self):
    r = requests.get(CloudApiTest.provider_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['abreviation'], 'aws')
    self.assertEqual(r.json()['provider'], 'Amazon Web Services')

  # Get instances for a particular cloud provider at a particular region
  def test_get_clouds_provider_region(self):
    r = requests.get(CloudApiTest.provider_region_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['abreviation'], 'aws')
    self.assertEqual(r.json()['provider'], 'Amazon Web Services')
    self.assertEqual(r.json()['cloud_instances'][0]['geo_region'], 'africa')
    self.assertEqual(len(r.json()['cloud_instances']), 1)

  # Get instances for a particular cloud provider at a particular region and nearest
  def test_get_clouds_provider_region_nearest(self):
    pass

if __name__ == "__main__":
  unittest.main()