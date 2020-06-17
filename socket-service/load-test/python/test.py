import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time


def on_message(ws, message):
    print(message)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


def on_open(ws):
    for i in range(300):
        time.sleep(1)
        #ws.send("Hello %d" % i)
    time.sleep(1)
    ws.close()
    print("thread terminating...")


def start_new_socket():
    ws = websocket.WebSocketApp("ws://localhost:8000/ws",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()


if __name__ == "__main__":
    websocket.enableTrace(True)
    for i in range(400):
        thread.start_new_thread(start_new_socket, ())
        time.sleep(0.1)
    ws = websocket.WebSocketApp("ws://localhost:8000/ws",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
