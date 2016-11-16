define([
  'jquery',
  'backbone',
  'json!config.json'
], function($, Backbone, cfg){ 
  m_lc = Backbone.Model.extend({
    initialize: function() {
      console.log("(m_lc.js) created m_lc instance");
    },
    execute: function (db, skycamref, orderby, limit, callback) {  
      console.log("(m_ss.js) calling webservice using GET method with path '/ss");
      that = this;
      res = $.get("http://" + cfg.catalogues_host + ":" + cfg.catalogues_port + "/ss/" + db + "/" + skycamref + "/mjd/0/json", function(data) {
        console.log("http://" + cfg.catalogues_host + ":" + cfg.catalogues_port + "/ss/" + db + "/" + skycamref + "/" + orderby + "/" + limit + "/json");
	callback(res);
      });
    }
  });
});
