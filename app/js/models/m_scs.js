define([
  'jquery',
  'backbone',
  'json!config.json'
], function($, Backbone, cfg){ 
  m_scs = Backbone.Model.extend({
    initialize: function() {
      console.log("(m_scs.js) created m_scs instance");
    },
    execute: function (ra, dec, sr, limit, callback) {  
      console.log("(m_scs.js) calling webservice using GET method with path '/scs");
      that = this;
      res = $.get("http://" + cfg.ws_host + ":" + cfg.ws_port + "/scs/" + ra + "/" + dec + "/" + sr + "/" + limit, function(data) {
        callback(res);
      });
    }
  });
});
