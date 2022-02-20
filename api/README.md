Start of spec for REST API to query sensor data

////////////

Looking at
FastAPI https://fastapi.tiangolo.com/
FastAPI docs https://fastapi.tiangolo.com/tutorial/first-steps/
demo code  main.py
install   pip install "fastapi[all]"
run       uvicorn main:app --reload

Design

data structure of archive ie default sensor setup

an example  map  https://maps.sensor.community/#13/57.0998/-2.8778   data csv for download http://archive.sensor.community/2022-02-18/2022-02-18_sds011_sensor_42082.csv    archive list  http://archive.sensor.community/2022-02-18/   by time  http://archive.sensor.community/

existing api

http://b726-34-236-18-197.ngrok.io/
https://github.com/opendata-stuttgart/meta/wiki/EN-APIs

Query by

geojson tools https://geojson.io/

Time  Time range

Device ID  

Sensor ID

Location specific   reactangle area
