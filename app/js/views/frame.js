define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'text!templates/frame.html'
], function($, _, Backbone, Bootstrap, frameTemplate) { 
  var Frame = Backbone.View.extend({
    el: '#container',
    initialize: function() {
      console.log("(frame.js) created <frame> view");
    },
    render: function (callback) {  
      var template = _.template(frameTemplate, {});
      this.$el.html(template);
      callback();
    },
    events: {
    }
  });
  return Frame;
});

