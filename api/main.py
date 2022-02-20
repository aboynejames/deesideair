from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/devices/location/lat/{lat}/lon/{lon}")
async def read_item(lat,lon):
    return {"devices_id": [lat, lon, 1, 2, 3]}


@app.get("/devices/area/{lat}/{lon}/{distance}")
async def read_item(lat, lon, distance):
    return {"devices_id": [lat, lon, distance, 1, 2, 3, 4, 5, 6]}


@app.get("/devices/box/{lat1}/{lon1}/{lat2}/{lon2}")
async def read_item(lat1, lon1, lat2, lon2):
    return {"devices_id": [lat1, lon1, lat2, lon2, 1, 2, 3, 4, 5, 6, 7, 8]}


@app.get("/device/{device_id}")
async def read_item(device_id):
    return {"device_id": [device_id, 1, 2, 3, 4]}


@app.get("/device/{device_id}/sensor/{sensor_id}")
async def read_item(device_id, sensor_id):
    return {"sensor_id": [device_id, sensor_id, 1, 2, 3, 5]}


@app.get("/device/{device_id}/sensor/{sensor_id}/timestamp/{start_id}/{end_id}")
async def read_item(device_id, sensor_id, start_id, end_id):
    return {"time_range": [device_id, sensor_id, start_id, end_id, 1, 2, 3, 4, 5, 6]}
