from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/devices/{location}")
async def read_item(location):
    return {"devices_id": [1, 2, 3]}


@app.get("/device/{device_id}")
async def read_item(device_id):
    return {"device_id": [1, 2, 3, 4]}


@app.get("/device/{sensor_id}")
async def read_item(sensor_id):
    return {"sensor_id": [1, 2, 3, 5]}

@app.get("/device/{sensor_id}/timestamp/{start_id}/{end_id}")
async def read_item(sensor_id):
    return {"time_range": [1, 2, 3, 4, 5, 6]}
