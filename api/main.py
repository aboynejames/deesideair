from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/devices/{location}")
async def read_item(location):
    return {"item_id": [1, 2, 3]}


@app.get("/device/{device_id}")
async def read_item(device_id):
    return {"item_id": [1, 2, 3, 4]}


@app.get("/device/{sensor_id}")
async def read_item(sensor_id):
    return {"item_id": [1, 2, 3, 5]}

@app.get("/device/{sensor_id}/{datestart_id}/{dateend_id}")
async def read_item(sensor_id):
    return {"item_id": [1, 2, 3, 4, 5, 6]}
