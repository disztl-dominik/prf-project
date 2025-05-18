prf-project:
    ng serve

docker:
    docker build -t my_mongo_image .
    docker run -it --name my_mongo_container -p 6000:27017 my_mongo_image

server:
    npx ts-node ./src/index.ts