from datetime import datetime

from flask import flash
from flask import Flask
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from sqlalchemy_serializer import SerializerMixin
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config.from_pyfile("hello.cfg")
db = SQLAlchemy(app)

db.create_all()


class Todo(db.Model, SerializerMixin):
    __tablename__ = "todos"
    id = db.Column("todo_id", db.Integer, primary_key=True)
    title = db.Column(db.String(60))
    text = db.Column(db.String(1024))
    done = db.Column(db.Boolean)
    pub_date = db.Column(db.DateTime)

    def __init__(self, title, text):
        self.title = title
        self.text = text
        self.done = False
        self.pub_date = datetime.utcnow()


@app.route("/")
def show_all():
    todos = Todo.query.order_by(Todo.pub_date.desc()).all()
    print(todos)
    todos_dict = [d.to_dict() for d in todos]
    return jsonify(todos_dict)


@app.route("/new", methods=["POST"])
def new():
    content = request.json
    todo = Todo(content["title"], content["text"])
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict())    


if __name__ == "__main__":
    db.create_all()
    app.run()
