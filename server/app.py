from flask import Flask, request
import requests
import json

app = Flask(__name__)

@app.route('/api/v1/clouds', methods=['GET'])
def getClouds():
  availableClouds = requests.get('https://api.aiven.io/v1/clouds').content
  return json.loads(availableClouds)

if __name__ == "__main__":
  app.run(debug=True)