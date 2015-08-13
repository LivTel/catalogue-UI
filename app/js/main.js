require.config({
  paths: {
    "underscore": "underscore",
    "lodash": "lodash",
    "jquery": "jquery",
    "jquery-ui": "jquery-ui",
    "backbone": "backbone",
    "bootstrap": "bootstrap",
    "bootstrap-collapse": "collapse",
    "text": "text",
    "json": "json",
    "log4javascript": 'log4javascript.min',
    "templates": '../templates',
    "socketio": "socket.io",
    "highcharts" : "highcharts",
    "histogram" : "histogram",
    "tablesorter" : "tablesorter",
    "cookies" : "cookies",
    "coords" : "coords",
    "bootbox" : "bootbox",
    "tableexport" : "tableExport",
    "base64" : "jquery.base64"
  },
  shim: 
     {
     'js9/js9support.min': {
       deps:[],
       exports : 'js9support'
     },
     'js9/js9': {
       deps:['js9/js9support.min', 'socketio'],
       exports : 'JS9'
     },
     'js9/js9plugins': {
       deps:['js9/js9'],
       exports : 'JS9'
     }
   }
});

require(["app", "router", "vm"], function(app, Router, Vm) {
  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ root: app.root });
});
