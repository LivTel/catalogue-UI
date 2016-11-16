define([
  'jquery',
  'backbone',
  'highcharts'
], function($, Backbone, hc){ 
  m_plot_lc = Backbone.Model.extend({
    initialize: function(render_to_container_id) {
      console.log("(m_plot_lc.js) created m_plot_lc instance");
      this.render_to_container_id = render_to_container_id;
    },
    render: function(series, callback) {
      container = $('#' + this.render_to_container_id);       
      container.highcharts({
        chart: {
          animation: false,
          type: 'line',
          backgroundColor: '#FFFFFF',
          width: 640,
          height: 640,
          zoomType: 'xy'      
        },
        colors: [
          '#000000', 
          '#8bbc21', 
          '#910000', 
          '#1aadce', 
          '#492970',
          '#f28f43', 
          '#77a1e5', 
          '#c42525', 
          '#a6c96a'
        ],
        credits: {
          enabled: false
        },
	tooltip: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderColor: 'black',
          borderRadius: 2,
          borderWidth: 1,
          formatter: function() {
	    return '<b>mjd: </b>' + this.x + ' <br>' + 
	    '<b>instrumental magnitude: </b>' + this.y.toFixed(1)
          },
          hideDelay: 400
        },
        plotOptions: {
          scatter: {
            turboThreshold: 0                   // this removes the limit on the amount of points allowed
          },
          series: {
            allowPointSelect: true
          },
          line: {
            marker: {
	      radius: 3,
              enabled: true
            }
          }
        },
        xAxis: {
          title: {
            text: "MJD",
            style: {
              color: '#000000'
            },
            offset: 30
          },
          labels: {
            style: {
              color: '#000000'
            }
          },
          gridLineWidth: 1,
          gridLineColor: '#D3D3D3',
          startOnTick: true,
          endOnTick: true,
          lineColor: '#000000',
          lineWidth: 1,
	  type: "datetime"
        },
        yAxis: {
          title: {
            text: "Instrumental Magnitude",
            style: {
              color: '#000000'
            },
            offset: 40
          },
          labels: {
            style: {
              color: '#000000'
            }
          },
          gridLineWidth: 1,
          gridLineColor: '#D3D3D3',
          startOnTick: true,
          endOnTick: true,
          lineColor: '#000000',
          lineWidth: 1

        },
        title: {
          text: '',
          style: {
            color: '#000000'
          },      
        },
        series: series
      });
    }
  });
});
