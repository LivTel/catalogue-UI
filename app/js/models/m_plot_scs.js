define([
  'jquery',
  'backbone',
  'highcharts'
], function($, Backbone, hc){ 
  m_plot_scs = Backbone.Model.extend({
    initialize: function(render_to_container_id) {
      console.log("(m_plot_scs.js) created m_plot_scs instance");
      this.render_to_container_id = render_to_container_id;
    },
    render: function(ra, dec, sr, data, callback) {
      Highcharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
        return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z'];
      };
      container = $('#' + this.render_to_container_id);       
      container.highcharts({
        chart: {
          animation: false,
          type: 'scatter',
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
        plotOptions: {
          scatter: {
            turboThreshold: 0                   // this removes the limit on the amount of points allowed
          },
          series: {
            allowPointSelect: true
          }
        },
        tooltip: {
          crosshairs: [{
            width: 1,
            color: 'Green'
          }, {
            width: 1,
            color: 'Green'
          }],
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderColor: 'black',
          borderRadius: 2,
          borderWidth: 1,
          formatter: function() {
	    if (this.series.name == "data") {
	      return '<b>id: </b>' + this.point.name + '<br>' +
	      '<b>ra: </b>' + this.x.toFixed(4) + ' deg<br>' + 
	      '<b>dec: </b>' + this.y.toFixed(4) + ' deg<br>' + 
	      '<b>dist: </b>' + this.point.distance.toFixed(1) + ' asec<br>' + 
	      '<b>num obs: </b>' + this.point.nobs + '<br>' + 
	      '<b>rmag: </b>' + this.point.rmag + '<br>' + 
	      '<b>bmag: </b>' + this.point.bmag
	    } else return false;
          },
          hideDelay: 400
        },
        legend: {
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          enabled: true
        },
        xAxis: {
          title: {
            text: "ra (deg)",
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
          lineWidth: 1
        },
        yAxis: {
          title: {
            text: "dec (deg)",
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
        series: [{
	  data: [[ra, dec]],
	  name: 'Marker',
	  marker: {
	      radius: 10,
	      lineColor: 'Green',
	      lineWidth: 2,
	      symbol: 'cross'
	    },
	  allowPointSelect: false,
	  enableMouseTracking: false,
	},
	{
          data: data, 
	  name: 'data',
          lineWidth: 0,   
          marker: {
            radius: 2,
            states: {
              select: {
                fillColor: 'Green',
                lineWidth: 0,
                radius: 3
              }
            }       
          }
        }],
      });
    }
  });
});
