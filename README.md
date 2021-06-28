# Welcome to Martı Tech Backend Assessment!

This public repository contains Backend Developer assessment project. 

# The Mission

You are The Backend Guy, responsible for the Routes API ©. On a quiet afternoon, while sipping your favorite coffee, your phone starts ringing. Your manager is calling, the coffee break is over you think and answer the call. 
Your manager hesitately speaks: 
"Ten different vehicles that need urgent attention from our operation crew. One of the fastest field operators - you know the guy - is assigned for the job and he is already approaching the first point. Your goal is to direct the operator to complete all ten vehicles, helping him to find the nearest vehicle next."
You put the phone down, crack your fingers.....

# Tech-savvy things
This repo contains a simple NodeJS Express application that responds to a GET request with the contents of data.json. 

You may use http://registry.gitlab.com/martitech-public/backend-assessment:latest Docker Image for the Api or clone this repository and run barebones. You can also build the Dockerfile in the repository or just use data.json file as an input.

If you are using the Docker image API listens on port 4000 and only responds to a GET request (i.e. http://localhost:4000)

# Output
Your output should be a json array, ordered vehicles by distance between them. 
We should reach your solution via a public git repo.

# Solution
Used geographic distance calculation formula for calculate distance behind the points. Then sort list as distances.

There are two alternative methods.

* First one is calculating as the first item of the list. http://localhost:4000/nearest

* Second one gets a geographic point and compare with items in the list. http://localhost:4000/getNearestByPosition/{latitude}/{longitude}



# How to run project?
There are some runing alternatives.
## Docker
If environment will be run on a `Docker Container.` Start docker-compose with shell script.
```
./run.sh
```

If not using linux run manuel docker-compose.
```
docker-compose -f docker-compose.yml -d
```
## Node.js
Start with `Node.js` on the host system.
```
node index.js
```
## Forever
Install and run with `Forever.`
```
npm install forever

forever start index.js
```
