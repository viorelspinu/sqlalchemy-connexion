docker-compose -f ./docker-compose-build.yml build

docker login registry-1.docker.io

docker tag docker_frontend registry-1.docker.io/viorelspinu/docker_frontend
docker tag docker_backend registry-1.docker.io/viorelspinu/docker_backend

docker push  registry-1.docker.io/viorelspinu/docker_frontend
docker push  registry-1.docker.io/viorelspinu/docker_backend
