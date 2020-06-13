
FROM python:3
COPY ./requirements.txt ./
RUN pip install -r ./requirements.txt
RUN pip install connexion[swagger-ui]

COPY ./* ./
CMD [ "python", "./app.py" ]