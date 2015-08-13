define(function(require, exports, module) {
  "use strict";
  var Backbone = require("backbone");
  var Router = Backbone.Router.extend({
    routes: {
      "dashboard": "index",
      "*notFound" : "index"
    },
    index: function() {
      console.log("(router.js) routing / or /dashboard");
      require(['views/frame', 'views/dashboard', 'vm'], function (Frame, Dashboard, Vm) {
        var frame = Vm.get('frame');	
        if(!frame) {
          frame = Vm.create({}, 'frame', Frame);
        }
        // call frame render function with dashboard render functions as callback
        frame.render(function() {
          var dashboard = Vm.get('dashboard');
          //if(!dashboard) {
            dashboard = Vm.create({}, 'dashboard', Dashboard);
          //}
          dashboard.render(function(){});
        });
      });
    }
 
  });
  module.exports = Router;
});
