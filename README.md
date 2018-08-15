# Tweets Analysis ui

Tweet analysis is an interactive web-based app that enable users to see the analysis of hashtag, user mention or keyword fot twitter data for specific period of time.

# Getting started
 
Installing and running Tweet Crawler on your machine should be a pretty straightforward process. In order to do so, you first need to install suitable versions of Docker and Docker Compose.

Making use of Docker (and Docker Compose) greatly simplifies the Tweet Crawler setup process and will make it easier for you to run this program on the platform of your choice.

If you already have up-to-date versions of these programs, feel free to skip straight to the Install and Run section.

## Prerequisites
We've included links below to installation instructions for Docker Community Edition on three popular platforms: Windows, Mac, and Ubuntu (Linux).

After following these instructions, you will be able to directly run the commands in the Install and Run section.

### Windows
* Visit the [ Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/) page
* Follow the instructions listed in the section called [Install Docker for Windows Desktop App](https://docs.docker.com/docker-for-windows/install/#install-docker-for-windows-desktop-app)
### Mac
* Visit the [Install Docker for Mac ](https://docs.docker.com/docker-for-mac/install/) page
* After downloading the .dmg file, follow the instructions listed in the section called [Install and Run Docker for Mac! ](https://docs.docker.com/docker-for-mac/install/#install-and-run-docker-for-mac)
### Ubuntu
* Visit the Get [I Docker CE for Ubuntu ](https://docs.docker.com/install/linux/docker-ce/ubuntu/)page
* Follow the instructions listed under the [Install Docker CE ](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce) section
* To install Docker Compose, visit the Install [Install Docker CE ](https://docs.docker.com/compose/install/) page
* Follow the instructions under the [Install Docker Compose ](https://docs.docker.com/compose/install/#install-compose)section
* Follow the [Linux post-install ](https://docs.docker.com/install/linux/linux-postinstall/) instructions

### Install and Run
If you've fulfilled the above prerequisites, it's very simple to download and run the server to be able call the apis from the user interface.

Clone the project repository from Github

`cd ~`
`git clone https://github.com/qcrisw/tweets_analysis.git`
`cd tweet-analysis`

### Running Tweets analysis server

`docker-compose up`

Now the server is working locally on ur machine on port 3000

### Testing the UI

Go to client folder, open index.html in the browser. No you can start search for specific search topic and see the results..

#Built With
* Node js,[ Express framework ](https://expressjs.com/) 
* [Promise js](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Mongo db](https://www.mongodb.com/)
* HTML5, CSS3, bootstrap, jQuery

#License
This project is licensed under the MIT License inside QCRI
