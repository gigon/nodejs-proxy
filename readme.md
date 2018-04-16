# nodejs-proxy

Prepare the file defs.txt as follows: 
- Each line is formatted as:  
prefix, target  
For example this line:
```
 /myserver, http://someserver.somehost.com 
```
Will route the request http://localhost:3000/myserver/someurl to http://someserver.somehost.com/someurl

- Any line or part of a line starting with # is ignored

- leave the last line with empty prefix "/" - as a default for any request that is not routed

### Example:
```
/applied-maths, https://download.applied-maths.com
/, https://www.mediacollege.com
```

## Test

```
docker-compose pull
docker-compose up -d

curl -i http://localhost:4000/applied-maths/sites/default/files/download/Chart%20data.zip
curl -i http://localhost:4000/video-gallery/testclips/barsandtone.flv

docker-compose down
```
The 1st command should download https://download.applied-maths.com/sites/default/files/download/Chart%20data.zip
The 2nd command should download https://www.mediacollege.com/video-gallery/testclips/barsandtone.flv
