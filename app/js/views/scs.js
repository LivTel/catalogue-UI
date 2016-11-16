function MJDtoDate(MJD){
   JD = MJD + 2400000.5
   var y = 4716;
   var v = 3;
   var j = 1401;
   var u =  5;
   var m =  2;
   var s =  153;
   var n = 12;
   var w =  2;
   var r =  4;
   var B =  274277;
   var p =  1461;
   var C =  -38;
   var f = JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
   var e = r * f + v;
   var g = Math.floor((e % p) / r);
   var h = u * g + w;
   var D = Math.floor((h % s) / u) + 1;
   var M = ((Math.floor(h / s) + m) % n) + 1;
   var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n) ;
   return new Date(Y,M-1,D);
}

define([
  'jquery',
  'jquery-ui',
  'lodash',
  'backbone',
  'bootstrap',
  'highcharts',
  'async',
  'js/models/m_scs.js',
  'js/models/m_lc.js',
  'js/models/m_plot_scs.js',
  'js/models/m_plot_lc.js',
  'text!templates/scs.html'
], function($, $ui, _, Backbone, Bootstrap, hc, async, SCS, LC, PlotSCS, PlotLC, SCSTemplate) {   
  var Dashboard = Backbone.View.extend({
    el: '#container-content',
    initialize: function() {
      console.log("(scs.js) created <scs> view");
      this.scs_plot = new m_plot_scs('container-scs-plot-placeholder');
      this.lc_plot = new m_plot_lc('container-lc-plot-placeholder');
    },
    repopulate_dom_on_database_change: function(dom, callback) {
      database = $(dom).find('#input_database')[0].value;
      select_filterby = $(dom).find('#input_filterby');
      select_orderby = $(dom).find('#input_orderby');
      input_min_nobs = $(dom).find('#input_min_nobs');
      input_max_nobs = $(dom).find('#input_max_nobs');

      orderby_values = [];					// catalogue dependent orderby columns
      filterby_values = [];					// catalogue dependent filterby columns
      input_min_nobs.attr('readonly', false);
      input_max_nobs.attr('readonly', false);
      switch(database) {
	case "skycamt":
	case "skycamz":
	  filterby_values.push('xmatch_apass_rollingmeanmag');
	  orderby_values.push('xmatch_apass_rollingmeanmag');
	  break;
	case "apass":
	  filterby_values.push('rmag', 'bmag'); 
	  orderby_values.push('rmag', 'bmag');
	  break;
	case "usnob":
	  input_min_nobs.attr('readonly', true);
	  input_max_nobs.attr('readonly', true);
	  filterby_values.push('rmag1','bmag1');
	  orderby_values.push('rmag1', 'bmag1');
	  break;
      }
      orderby_values.push('distance');
      
      select_filterby.empty()
      filterby_values.forEach(function(entry) {
        select_filterby.append($('<option>', {value: entry, text: entry}));
      });
      
      select_orderby.empty()
      orderby_values.forEach(function(entry) {
        select_orderby.append($('<option>', {value: entry, text: entry}));
      });
      
      return dom;
    },
    render: function (callback) {  
      $('#li-scs').toggleClass('active');
      
      var template = _.template(SCSTemplate, {});
      dom = $.parseHTML(template);
      dom = this.repopulate_dom_on_database_change(dom);
      
      this.$el.html(template);  
      $('#container-content').html(dom); 

      this.scs_plot.render([]); 
      this.lc_plot.render([{}]); 
    },
    events: {
      'change #input_database' : function(event) {
	event.preventDefault();

	dom = this.repopulate_dom_on_database_change(dom);
	this.$el.html(dom);  
        $('#container-content').html(dom); 
      },
      'click #getlc' : function(event) {
	event.preventDefault();
	
        $('#loading').modal('show');
	
	database = $('#input_database')[0].value;
        switch (database) {
	  case "skycamt":
	  case "skycamz":
	    var hc_scs = $("#container-scs-plot-placeholder").highcharts();
	    var hc_lc = $("#container-lc-plot-placeholder").highcharts();
	    pts = hc_scs.getSelectedPoints();
	    objs = [];
	    pts.forEach(function(entry) {
	      objs.push(entry.name);
	    });

	    var that = this;
	    var o_idx = 0;
	    series = []
	    async.whilst(
	      function () { return o_idx < objs.length; },
	      function (callback) {
		var lc = new m_lc();
		lc.execute(database, objs[o_idx], "mjd", 0, function(res) {
		  if (res.status == 200) {
		    data = res.responseJSON;
		    data_filtered = [];
		    data.forEach(function(entry) {
		      data_filtered.push({
			"x": MJDtoDate(entry.mjd),
			"y": entry.inst_mag-entry.frame_zp_apass
		      });
		    });
		    series.push({
		      "data": data_filtered,
		      "linewidth" : 1,
	              "name": objs[o_idx]
		    });
		  }
		  o_idx++;
		  callback();
		});
	      },
	      function (err) {
		if (objs.length > 0) {
		  that.lc_plot.render(series);  
		} else {
		  $('#scs-info').removeClass("alert-info alert-danger alert-success alert-warning").addClass("alert-danger");
	          $('#scs-info').text('No points selected.')
		}
		$('#loading').modal('hide');
	      }
	    );
	    break;
	  default:
	    $('#scs-info').removeClass("alert-info alert-danger alert-success alert-warning").addClass("alert-danger");
	    $('#scs-info').html('<b>Database</b> field should be either SkycamT or SkycamZ.')
	    $('#loading').modal('hide');
	    break;
	}
      },
      'submit #form_sm' : function(event) {   
        event.preventDefault();
       
        $('#loading').modal('show');
        
        var ra;
        var dec;
        var sr;
        var lim;
        $('#form_sm').serializeArray().forEach(function(entry) {
          if (entry.name == "ra") {
	    if (entry.value.split(':').length == 3) {
	      ra_parts = entry.value.split(':')
	      hh = parseFloat(ra_parts[0])
	      mm = parseFloat(ra_parts[1])
	      ss = parseFloat(ra_parts[2])
	      ra = (hh+(mm/60)+(ss/3600))*15;
	    } else {
              ra = parseFloat(entry.value);
	    }
          } else if (entry.name == "dec") {
	    if (entry.value.split(':').length == 3) {
	      dec_parts = entry.value.split(':')
	      dd = parseFloat(dec_parts[0])
	      mm = parseFloat(dec_parts[1])
	      ss = parseFloat(dec_parts[2])
	      dec = dd+(mm/60)+(ss/3600);
	    } else {
              dec = parseFloat(entry.value);
	    }
          } else if (entry.name == "sr") {
            sr = parseFloat(entry.value);
          } else if (entry.name == "lim") {
            lim = parseInt(entry.value);
          } else if (entry.name == "min_nobs") {
	    min_nobs = parseInt(entry.value);
	  } else if (entry.name == "max_nobs") {
	    max_nobs = parseInt(entry.value);
	  } else if (entry.name == "min_mag") {
	    min_mag = parseFloat(entry.value);
	  } else if (entry.name == "max_mag") {
	    max_mag = parseFloat(entry.value);
	  } else if (entry.name == "database") {
	    database = entry.value;
	  } else if (entry.name == "filterby") {
	    filterby = entry.value;
	  } else if (entry.name == "orderby") {
	    orderby = entry.value;
	  }
        }); 
	
        var that = this;
        var scs = new m_scs();
        scs.execute(database, ra, dec, sr, lim, min_mag, max_mag, filterby, orderby, function(res) {
         if (res.status == 200) {
	    data = res.responseJSON;
	    
	    var highest = Math.log10(max_nobs);
	    var lowest = Math.log10(min_nobs);
	    var increment = (highest-lowest)/255;  
	    
	    data_filtered = [];
            data.forEach(function(entry) {
	      x	= parseFloat(entry.ra);
              y	= parseFloat(entry.dec);
              distance = parseFloat(entry.distance);
	      switch(database) {
		case "skycamt":
		case "skycamz":
		  name = entry.skycamref;
		  rmag = parseFloat(entry.xmatch_apass_rollingmeanmag);
		  bmag = null;
		  nobs = entry.nobs;
		  break;
		case "apass":
		  name = entry.apassref;
		  rmag = parseFloat(entry.rmag);
		  bmag = parseFloat(entry.bmag);
		  nobs = entry.nobs;
	          break;
		case "usnob":
		  name = entry.usnobref;
		  rmag = parseFloat(entry.rmag1);
		  bmag = parseFloat(entry.bmag1);
		  nobs = 1
		  break;
	      }
              color = '#' + Math.round((Math.log10(nobs)-lowest)/increment).toString(16) + '0000';
              if ((nobs >= min_nobs && nobs <= max_nobs) || ($('#input_min_nobs').is("[readonly]") && $('#input_max_nobs').is("[readonly]"))) {
		data_filtered.push({
		  'name': name, 
		  'x': x, 
		  'y': y, 
		  'distance': distance, 
		  'nobs': nobs, 
		  'color': color, 
		  'rmag': rmag,
		  'bmag': bmag
		});
	      }
            });
	    $('#scs-info').removeClass("alert-info alert-danger alert-success alert-warning").addClass("alert-success");
	    $('#scs-info').text('Done. Retrieved ' + data.length + ' catalogue (' + data_filtered.length + ' w/ filters) objects.')
            that.scs_plot.render(ra, dec, sr, data_filtered); 
          }
          $('#loading').modal('hide');
        });  
      }
    }
  });
  return Dashboard;
});

