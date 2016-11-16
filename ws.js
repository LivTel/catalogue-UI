var sys = require('sys')
	, http = require('http')
	, restify = require('restify')
	, fs = require('fs')
	, cfg = require('./config.json')
	, formidable = require('formidable')
	, util = require('util')
        , path = require('path')
        , mime = require('mime')
        , sqlite3 = require("sqlite3").verbose()
        , pg = require('pg')
	; 
        
// EXPOSED WEB SERVICES
function index(req, res, next) { 
  fs.readFile('html/index.htm', {encoding : "UTF-8"}, function (err, html) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);  
  });
}

// INTERNAL FUNCTIONS


var server = restify.createServer();
server.use(restify.bodyParser())

server.get('/', index);

server.pre(restify.CORS({
        credentials: true
}));

server.listen(cfg['ws_port'], function() {
	console.log("(ws.js) server running on port " + cfg['ws_port']);
});
