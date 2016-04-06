define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'js/models/m_scs.js',
  'js/models/m_plot.js',
  'text!templates/scs.html'
], function($, _, Backbone, Bootstrap, SCS, Plot, SCSTemplate) {   
  var Dashboard = Backbone.View.extend({
    el: '#container-content',
    initialize: function() {
      console.log("(scs.js) created <scs> view");
      this.scs_plot = new m_plotSCS('container-plot-placeholder');
    },
    render: function (callback) {  
      $('#li-scs').toggleClass('active');
      
      var template = _.template(SCSTemplate, {});
      this.$el.html(template);
      $('#container-content').html(template); 
      
      this.scs_plot.render([]); 
    },
    events: {
      'submit #form_sm' : function(event) {   
        event.preventDefault();
       
        $('#loading').modal('show');
        
        var ra;
        var dec;
        var sr;
        var lim;
        
        $('#form_sm').serializeArray().forEach(function(entry) {
          if (entry.name == "ra") {
            ra = entry.value;
          } else if (entry.name == "dec") {
            dec = entry.value;
          } else if (entry.name == "sr") {
            sr = entry.value;
          } else if (entry.name == "lim") {
            lim = entry.value;
          } 
        }); 
        var that = this;
        var scs = new m_scs();
        scs.execute(ra, dec, sr, lim, function(res) {
         if (res.status == 200) {
            $('#loading').modal('hide');
            data = []
            JSON.parse(res.responseText).forEach(function(entry) {
              data.push({
                'name' : entry.skycamref,
                'x' : entry.radeg,
                'y' : entry.decdeg,
                'distance' : entry.distance,
                'nobs' : entry.nobs
              });
            });
            that.scs_plot.render(data); 
          } else {
            $('#loading').modal('hide');
          }
        });  
      }
    }
  });
  return Dashboard;
});

