//------------------------------
//
// //['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'

var http = require('http');
var connect = require('connect');
var proxy = require('http-proxy-middleware');
var path = require('path'),
  fs = require('fs-extra');

var loadProxyConfig = function(app, jsonPath) {
  var proxyConfig = require(jsonPath);
  var proxy_set = proxy(proxyConfig.context, proxyConfig.options);    
  app.use(proxy_set);  
}

var loadProxyConfigs = function(app) {
  var jsonDir = path.join(__dirname, './proxies');
  fs.readdirSync(jsonDir).forEach(function (file) {
    if (file != 'default.json') {
      var jsonPath = path.join(jsonDir, file);
      loadProxyConfig(app, jsonPath);  
    }
  });  
  var jsonPath = path.join(jsonDir, 'default.json');
  loadProxyConfig(app, jsonPath);
}

var app = connect();

loadProxyConfigs(app);

http.createServer(app).listen(4000);