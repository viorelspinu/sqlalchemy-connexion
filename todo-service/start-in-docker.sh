#!/bin/bash

./wait-for-it.sh db_server:3306 -t 40
python ./app.py