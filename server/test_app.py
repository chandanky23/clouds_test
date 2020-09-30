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
  provider_region_url = '{}?provider=aws&region=south asia'.format(base_url)
  
  provider_region_nearest_first_url = '{}?provider=aws&region=south asia&lat=15.10&lng=60.03&direction=nearest_first'.format(base_url)
  provider_region_farthest_first_url = '{}?provider=aws&region=south asia&lat=15.10&lng=60.03&direction=farthest_first'.format(base_url)

  response_all_provider_uri = {
    "aws": "Amazon Web Services",
    "azure": "Microsoft Azure",
    "do": "DigitalOcean",
    "google": "Google Cloud",
    "upcloud": "UpCloud"
  }

  response_provider_uri = {
    "short_name": "aws",
    "provider": "Amazon Web Services",
    "cloud_instances": [
      {
        "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
        "cloud_name": "aws-me-south-1",
        "geo_latitude": 26.07,
        "geo_longitude": 50.55,
        "geo_region": "south asia"
      },
      {
        "cloud_description": "Asia, India - Amazon Web Services: Mumbai",
        "cloud_name": "aws-ap-south-1",
        "geo_latitude": 19.13,
        "geo_longitude": 72.89,
        "geo_region": "south asia"
      },
      {
        "cloud_description": "Asia, Hong Kong - Amazon Web Services: Hong Kong",
        "cloud_name": "aws-ap-east-1",
        "geo_latitude": 22.5,
        "geo_longitude": 114.0,
        "geo_region": "east asia"
      }
    ]
  }
  
  response_provider_region_uri = {
    "short_name": "aws",
    "provider": "Amazon Web Services",
    "cloud_instances": [
      {
        "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
        "cloud_name": "aws-me-south-1",
        "geo_latitude": 26.07,
        "geo_longitude": 50.55,
        "geo_region": "south asia"
      },
      {
        "cloud_description": "Asia, India - Amazon Web Services: Mumbai",
        "cloud_name": "aws-ap-south-1",
        "geo_latitude": 19.13,
        "geo_longitude": 72.89,
        "geo_region": "south asia"
      }
    ]
  }

  response_provider_region_coord_nearest_uri = {
    "short_name": "aws",
    "provider": "Amazon Web Services",
    "cloud_instances": [
      {
        "cloud_description": "Asia, India - Amazon Web Services: Mumbai",
        "cloud_name": "aws-ap-south-1",
        "distance": 894.0469180182218,
        "geo_latitude": 19.13,
        "geo_longitude": 72.89,
        "geo_region": "south asia"
      },
      {
        "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
        "cloud_name": "aws-me-south-1",
        "distance": 972.0809670303456,
        "geo_latitude": 26.07,
        "geo_longitude": 50.55,
        "geo_region": "south asia"
      }
    ]
  }

  response_provider_region_coord_farthest_uri = {
    "short_name": "aws",
    "provider": "Amazon Web Services",
    "cloud_instances": [
      {
        "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
        "cloud_name": "aws-me-south-1",
        "distance": 972.0809670303456,
        "geo_latitude": 26.07,
        "geo_longitude": 50.55,
        "geo_region": "south asia"
      },
      {
        "cloud_description": "Asia, India - Amazon Web Services: Mumbai",
        "cloud_name": "aws-ap-south-1",
        "distance": 894.0469180182218,
        "geo_latitude": 19.13,
        "geo_longitude": 72.89,
        "geo_region": "south asia"
      }
    ]
  }
  
  # Test if the endpoint is correct and respoding.
  def test_aiven_endpoint(self):
    r = requests.get(CloudApiTest.aiven_api)
    self.assertEqual(r.status_code, 200)

  # Get available cloud providers
  def test_available_cloud_providers(self):
    r = requests.get(CloudApiTest.base_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(len(r.json()), 5)
    self.assertDictEqual(r.json(), CloudApiTest.response_all_provider_uri)

  # Get all instances for a particular cloud provider
  def test_get_clouds_provider(self):
    r = requests.get(CloudApiTest.provider_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['short_name'], 'aws')
    self.assertEqual(r.json()['provider'], 'Amazon Web Services')

  # Get instances for a particular cloud provider at a particular region
  def test_get_clouds_provider_region(self):
    r = requests.get(CloudApiTest.provider_region_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['short_name'], 'aws')
    self.assertEqual(r.json()['provider'], 'Amazon Web Services')
    self.assertEqual(r.json()['cloud_instances'][0]['geo_region'], 'south asia')
    self.assertEqual(len(r.json()['cloud_instances']), 2)

  # Get instances for a particular cloud provider at a particular region and nearest first
  def test_get_clouds_provider_region_nearest(self):
    r = requests.get(CloudApiTest.provider_region_nearest_first_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['cloud_instances'][0]['cloud_name'], 'aws-ap-south-1')

  # Get instances for a particular cloud provider at a particular region and farthest first
  def test_get_clouds_provider_region_farthest(self):
    r = requests.get(CloudApiTest.provider_region_farthest_first_url)
    self.assertEqual(r.status_code, 200)
    self.assertEqual(r.json()['cloud_instances'][0]['cloud_name'], 'aws-me-south-1')

if __name__ == "__main__":
  unittest.main()