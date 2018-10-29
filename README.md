# bouquet-generator
Nodejs CLI app to generate bouquets

## Installation
npm install

## Run
#### To add bouquet
node commands.js add
#### then for example add these two bouquet spec one by one:
ZLb8c6a7<br />
XSl5m4n3

#### To update flower stock, then generate bouquets and add bouquet stock
node commands.js update
#### then add these flowers for example
bL,cL,aL,lS,mS,nS

## Run as a Docker container

#### Build a docker image
docker build -t bouquet-generator .

#### Run the container
sudo docker run -p 80 bouquet-generator node commands.js add
