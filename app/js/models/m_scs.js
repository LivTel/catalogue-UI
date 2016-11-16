define([
  'jquery',
  'backbone',
  'json!config.json'
], function($, Backbone, cfg){ 
  m_scs = Backbone.Model.extend({
    initialize: function() {
      console.log("(m_scs.js) created m_scs instance");
    },
    execute: function (db, ra, dec, sr, limit, min_mag, max_mag, filterby, orderby, callback) {  
      console.log("(m_scs.js) calling webservice using GET method with path '/scs");
      that = this;
      res = $.get("http://" + cfg.catalogues_host + ":" + cfg.catalogues_port + "/scs/" + db + "/" + ra + "/" + dec + "/" + sr + "/" + filterby + "/" + min_mag + "/" + max_mag + "/" + orderby + "/" + limit + "/json", function(data) {
        console.log("http://" + cfg.catalogues_host + ":" + cfg.catalogues_port + "/scs/" + db + "/" + ra + "/" + dec + "/" + sr + "/" + filterby + "/" + min_mag + "/" + max_mag + "/" + orderby + "/" + limit + "/json");
	callback(res);
      });
    }
  });
});
