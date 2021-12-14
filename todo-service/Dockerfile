FROM python:3.8
COPY ./requirements.txt ./
RUN pip install -r ./requirements.txt
RUN pip install connexion[swagger-ui]

COPY ./* ./
CMD ["bash", "-c", "./start-in-docker.sh" ]