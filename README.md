# Simple Load Balancer

This project consists of three main parts. First, we have a load balancer that will check the running instances of the application and will redirect all the requests to available servers. Second, we have a node application that records the number of requests it received, and show JSON metrics on route /metrics. And last, there is a metric collector service that dynamically collects the metrics of all running applications and exposes them at port 9090.
</br>
</br>

## Some Notes About ...

### - Load Balancer

At its core, the load balancer is a simple proxy that will redirect all requests to one of the available servers with a round-robin algorithm. To obtain the server ports, it uses the docker CLI and obtains running containers of the application image. So, if you want to run it as a docker container, you should remember to pass the docker.socket as a volume.

### - Application

The application is a simple express app that has a get route on / and you can see the number of requests on this path on /metrics.

### - Metric Collector

The metric collector also uses docker.socket to obtain the id and port of application containers. It will query every available server in an interval (5 seconds by default) and updates its metrics.

</br>

## Running The Project

You can run every section of the project separately by installing the node dependencies and running them separately with npm. Also, you can use the docker file provided in every section to build the image and run them separately. The last and easiest way is using the provided docker-compose file.

```bash
# using npm
$ npm install
$ cp .env.example .env
$ npm run start

# useing docker
$ docker build -t name_of_image .  # Name of the application module should be application
$ docker run -p ...:... .   # If running metric_collector or load_balance, pass -v ...:/var/run/docker.sock

# using docker compose
$ docker compose up --build
```

You can also use docker compose for deploying load_balancer or metric_collector and setup the applications with other methods.
</br>
</br>
