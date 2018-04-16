# nodejs-proxy

A simple http proxy service, based on nodejs. 

## Usage

```
git clone https://github.com/gigon/nodejs-proxy.git
cd nodejs-proxy
```

Modify the file ./proxies/defs.txt as follows: 

- Each line is formatted as:  prefix, target  

For example, this line:
```
 /myserver, http://someserver.somehost.com 
```
Will route the request http://localhost:3000/myserver/someurl to http://someserver.somehost.com/someurl

- Any line or part of a line starting with # is ignored

- leave the last line with empty prefix "/" - as a default for any request that is not routed

### Example defs file:
```
/applied-maths, https://download.applied-maths.com
/, https://www.mediacollege.com
```

## Run the service - with docker-compose

```
docker-compose pull
docker-compose up -d
```

## Run the service with docker run

```
docker pull gigon/nodejs-proxy:v1.0.0
mkdir proxies
```
Now edit proxies/defs.txt as explained above, and:

```
docker run -it --rm --name nodejs-proxy -p 4000:4000 -v ./proxies/defs.txt:/home/node/app/proxies/defs.txt gigon/nodejs-proxy:v1.0.0 node app.js
```
(On Windows, you may need to give the absolute path to defs.txt, and add a .env file with COMPOSE_CONVERT_WINDOWS_PATHS=1)

## Test (if you leave the original defs.txt file as is)

```
curl -i http://localhost:4000/applied-maths/sites/default/files/download/Chart%20data.zip
curl -i http://localhost:4000/video-gallery/testclips/barsandtone.flv
```

The 1st command should download https://download.applied-maths.com/sites/default/files/download/Chart%20data.zip
The 2nd command should download https://www.mediacollege.com/video-gallery/testclips/barsandtone.flv

## Shutdown the service
```
docker-compose down
```
OR  
```
docker rm -f nodejs-proxy
```
