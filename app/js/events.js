define([
  'jquery',
  'underscore',
  'backbone',
  'log'
], function($, _, Backbone, log){
  log.debug("events: setup the vent object");
  var vent = _.extend({}, Backbone.Events);
  log.debug("events: return the vent object");
  return vent;
});
