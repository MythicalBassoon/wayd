# WAYD (What Are You Doing?)

WAYD is a React Native iOS application that recommends a random event in your area to help undecisive groups decide what to do

## Team

- __Product Owners__: Mark Peter, Shafique Rashid
- __Scrum Master__: Spencer Gulbronson
- __DevOps__: Richard Castro
- __Development Team__: Mark Peter, Shafique Rashid, Spencer Gulbronson, Richard Castro

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
	1. [Installing Dependencies](#installing-dependencies)
	2. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing](#contributing)

## Usage

Users can input their current location or a specific location of their choice and receive a psuedo-random event in the area. Details and map information are provided for each event. If they don't like the event given to them, they can continue generating different events in the area. 

Users will also be able to send a poll to their friends from the app, allowing for group voting on the event to see if its something everyone wants to attend. The user themself and their friends will be able to vote in the email and confirmation emails will be sent out once everyone has voted.

### Explore


### Gifs coming soon!




## Requirements

### Frontend

- React Native: 0.18.0
- React Native modules
  - Simple Auth: 0.3.0
  - Google-Place-Autocomplete: 1.1.6
  - React Native Maps: 0.1.5
  - Icons: 0.7.1
  - Material-Kit: 0.2.5
  - React Native Contacts: 0.2.1
  - React Native Simple Store: 0.1.0
- Redux: 3.0.4
- Redux-Thunk: 1.0.0
- Moment: 2.10.6


### Backend

#### RESTful API Server
- Node 5.3.9
- Express 4.13.4
- Postgres
- Redis

#### Micro-services
- Node
- Express
- Nodemailer
- Redis

### Deployment

- Docker
- DigitalOcean

## Development

### Installing Dependencies

From the root folder of the repo:

```sh
npm install
```

From the post-install folder:
- Grab/Copy the 'apikeys.js' file into 'root'/Server/Workers & 'root'/Server/Controllers/ & 'root'
or run the following commands from the post-install folder:

```sh
cp apikeys.js ../Server/Workers/
cp apikeys.js ../Server/Controllers/
cp apikeys.js ../
```

NOTE: You must provide your own API keys for the keys indicated in apikeys.js

- Grab/Copy the rest of the folders within the post-install folder and paste them into the node_module directory:

```sh
yes | cp -rf react-native-maps/* ../node_modules/react-native-maps/
yes | cp -rf react-native-google-places-autocomplete/* ../node_modules/react-native-google-places-autocomplete/
yes | cp -rf react/* ../node_modules/react/
yes | cp -rf react-native/* ../node_modules/react-native/


```

NOTE: You must replace the entire folder found in node_modules with the folders found in the post-install folder as shown above. Otherwise, the project will silently not compile or will encounter errors during simulation.


## Running Locally iOS

1. You must have Xcode version 7.1 or higher
2. Run Postgres server
3. Create database 'wayd' from Postgres-cli
4. Run 'node Server/server.js' from the project root directoy
5. Run 'node Server/Workers/jobserver.js'
6. Run 'node Server/Workers/jobqueue.js' 
7. Open 'wayd.xcworkspace' in Xcode
8. Cmd + R or press Run

Optionally:
A docker .yml file is provided as well as the accompanying DockerFile(s) that create docker containers that will host server.js, jobserver.js, and jobqueue.js as shown above. You may alter the client side variables to use docker routes instead of localhost routes. Instructions are found in the respective clientside files.

### Roadmap

Coming Soon!


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
