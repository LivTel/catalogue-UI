var express = require('express')
  , serveStatic = require('serve-static')
  , log4js = require('log4js')
  , logger = log4js.getLogger()
  , cfg = require('./config.json')
  ;
  
app = express();
app.use(serveStatic(cfg['app_dir'], {'index': ['index.html', 'index.htm']}));
app.use('/jobs', express.static(cfg['jobs_dir']));
app.use('/img', express.static(cfg['img_dir']));

app.listen(cfg['http_port'], function() {
  logger.info("(http.js) server running on port " + cfg['http_port']);
});

