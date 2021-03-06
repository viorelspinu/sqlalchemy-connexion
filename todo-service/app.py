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
import connexion
import os
import sys


def get_all():
    todos = Todo.query.order_by(Todo.pub_date.desc()).all()
    print(todos)
    todos_dict = [d.to_dict() for d in todos]
    return jsonify(todos_dict)


def new():
    content = request.json
    todo = Todo(content["title"], content["text"])
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict())


def filter():
    content = request.json
    titleLike = content["title"]
    textLike = content["text"]
    print(titleLike, textLike)
    todos = Todo.query.filter(Todo.title.like("%" + titleLike + "%")).filter(Todo.text.like("%" + textLike + "%")).order_by(Todo.pub_date.desc())
    todos_dict = [d.to_dict() for d in todos]
    return jsonify(todos_dict)


connexion_app = connexion.App(__name__, specification_dir='./')
app = connexion_app.app
connexion_app.add_api('api.yml')
CORS(app)
app.config.from_pyfile("app.cfg")
DB_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
if DB_URI is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
else:
    print("You need to set SQLALCHEMY_DATABASE_URI !")
    sys.exit()

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


if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0')
