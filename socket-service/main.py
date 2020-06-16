from fastapi import FastAPI, WebSocket, Request
from starlette.websockets import WebSocketDisconnect

from fastapi.templating import Jinja2Templates
from typing import List
import time


app = FastAPI()
templates = Jinja2Templates(directory="templates")


connections: List[WebSocket] = []


@app.get("/status")
async def get(request: Request):
    return templates.TemplateResponse("status.html", {"request": request})


@app.get("/admin")
async def admin(request: Request):
    return templates.TemplateResponse("admin.html", {"request": request,  "count": len(connections)})


@app.get("/update")
async def update(request: Request, id, color):
    print(id, color)
    for w in connections:
        try:
            await w.send_text("__STATUS_CHANGE__" + id + ":" + color)
        except WebSocketDisconnect:
            connections.remove(w)
    print(len(connections))
    return templates.TemplateResponse("admin.html", {"request": request, "count": len(connections)})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        connections.append(websocket)
        print(len(connections))
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        connections.remove(websocket)
