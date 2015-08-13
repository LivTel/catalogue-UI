define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'log'
], function($, _, Backbone, Events, log){
  var views = {};
  var create = function (context, name, View, options) {
    // View clean up isn't actually implemented yet but will simply call .clean, .remove and .unbind
    if(typeof views[name] !== 'undefined') {
      views[name].undelegateEvents();
      if(typeof views[name].clean === 'function') {
        views[name].clean();
      }
    }
    var view = new View(options);
    views[name] = view;
    if(typeof context.children === 'undefined'){
      context.children = {};
      context.children[name] = view;
    } else {
      context.children[name] = view;
    }
    Events.trigger('viewCreated');
    return view;
  };
  var close = function(name) {
    if(typeof views[name] !== 'undefined') {
      // view exists
      if (this.beforeClose) {
        this.beforeClose();
      }
      if(typeof views[name].clean === 'function') {
        views[name].clean();
      }
      views[name].remove();
      views[name].unbind();		
    }
  }
  var get = function(name) {
    return views[name];
  }

  //TODO: need reset method to clear out all views so a new login always returns the same home view
  return {
    create: create, close: close, get: get
  };
});
