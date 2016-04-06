define([
  'jquery',
  'backbone',
  'highcharts',
], function($, Backbone, hc){ 
  m_plotSCS = Backbone.Model.extend({
    initialize: function(render_to_container_id) {
      console.log("(m_plotSCS.js) created m_plotSCS instance");
      this.render_to_container_id = render_to_container_id;
    },
    render: function(data, callback) {
      container = $('#' + this.render_to_container_id);       
      container.highcharts({
        chart: {
          animation: false,
          type: 'scatter',
          backgroundColor: '#FFFFFF',
          width: 480,
          height: 480,
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
            color: 'red'
          }, {
            width: 1,
            color: 'red'
          }],
          backgroundColor: '#FFFFFF',
          borderColor: 'black',
          borderRadius: 2,
          borderWidth: 1,
          formatter: function() {
            return '<b>id: </b>' + this.point.name + '<br>' +
            '<b>ra: </b>' + this.x + ' deg<br>' + 
            '<b>dec: </b>' + this.y + ' deg<br>' + 
            '<b>dist: </b>' + this.point.distance + ' deg<br>' + 
            '<b>num obs: </b>' + this.point.nobs;
          },
          hideDelay: 400
        },
        legend: {
          backgroundColor: '#000000',
          borderColor: 'black',
          borderRadius: 2,
          itemStyle: {
            color: '#000000'
          },
          itemHoverStyle: {
            color: '#FF0000'
          },
          enabled: false
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
          gridLineColor: 'grey',
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
          gridLineColor: 'grey',
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
          name: '',
          data: data, 
          lineWidth: 0,   
          marker: {
            radius: 2,
            states: {
              select: {
                fillColor: 'red',
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
