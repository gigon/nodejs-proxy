//------------------------------
//
// //['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'

var http = require('http');
var connect = require('connect');
var proxy = require('http-proxy-middleware');
var path = require('path'),
  fs = require('fs-extra');

var loadProxies = function(app, logLevel) {
  var jsonPath = path.join(__dirname, './proxies/defs.txt');
  var data = fs.readFileSync(jsonPath, 'utf8');
  data.toString().split("\n").forEach(function(line, index, arr) {
    line = line.trim();
    if (line.length && line[0] != "#") {
      line = line.replace(/\#.*$/, "").trim();
      console.log(index + " " + line);
      var parts = line.split(',');
      if (parts.length != 2) {
        console.error("Line " + index + " error: must be in the format 'prefix, route'. Current: " + line);
      } else {
        var proxyConfig = {
          "context": parts[0],
          "options": {
            "target": parts[1],
            "pathRewrite": {},
            "changeOrigin": true,
            "logLevel": logLevel
          }
        }
        proxyConfig.options.pathRewrite["^" + parts[0]] = "/";
        console.log(JSON.stringify(proxyConfig));
        var proxy_set = proxy(proxyConfig.context, proxyConfig.options);    
        app.use(proxy_set);        
      }
    }
  });
}

var app = connect();

loadProxies(app, "debug");

http.createServer(app).listen(4000);