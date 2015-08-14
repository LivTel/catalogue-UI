define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'text!templates/dashboard.html'
], function($, _, Backbone, Bootstrap, dashboardTemplate) {   
  var Dashboard = Backbone.View.extend({
    el: '#container-content',
    initialize: function() {
      console.log("(dashboard.js) created <dashboard> view");
    },
    render: function (callback) {  
      $('#li-dashboard').toggleClass('active');
      
      var template = _.template(dashboardTemplate, {});
      this.$el.html(template);
      $('#container-content').html(template);
      
      callback();
    },
    events: {
    }
  });
  return Dashboard;
});

