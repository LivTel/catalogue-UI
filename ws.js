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

function scs(req, res, next) {
    console.error("received scs request");
    ra = req.params.ra, dec = req.params.dec, sr = req.params.sr, lim = req.params.lim;

    conString = "postgres://" + cfg.db_host + ":" + cfg.db_port + "/skycam";
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        // construct LIMIT clause
        lim_clause = " LIMIT " + lim;

        qry = "SELECT apassref, ra, dec, inst_mag, count(*) as n_obs, degrees(pos <-> spoint '(" + ra + "d," + dec + "d)') as distance FROM skycamz.sources WHERE pos @ scircle '<(" + ra + "d," + dec + "d)," + sr + "d>' = true GROUP BY apassref, ra, dec, inst_mag, distance" + lim_clause;
        client.query(qry, function(err, result) {
            console.log('executing query: "' + qry + '"');
            done();
            if(err) {
                 return console.error('error running query', err);
            }
            res.send(result.rows);
        });
    });
}

// INTERNAL FUNCTIONS

var server = restify.createServer();
server.use(restify.bodyParser())

server.get('/', index);
server.get('/scs/:ra/:dec/:sr/:lim', scs);

server.pre(restify.CORS({
        credentials: true
}));

server.listen(cfg['ws_port'], function() {
	console.log("(ws.js) server running on port " + cfg['ws_port']);
});
