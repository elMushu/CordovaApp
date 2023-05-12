/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Liga para cordova.js
//platforms/android/platform_www/cordova.js

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//Data Info
let humidity = [];
let temperature = [];
let time = [];
let smoke = [];
let light = [];
let data = [];

//PUT
//body:{
//  "show": true,
//}

async function getInfo(){
  const setting = {
    "async": true,
    "crossDomain": true,
    "url": "https://erickmaya.pythonanywhere.com/raspberry/features",
    "method": "GET"
  };

  $.ajax(setting).done(function (response) {
    data = response;
    $.each(data, function(i, v){
      humidity.push(v.humedad);
      temperature.push(v.temperatura);
      time.push(v.tiempo.slice(0,5));
      smoke.push(v.humo);
      light.push(v.luz);
    });
  });
}

//Execute when the page is load
$(function () {
  setInterval(function (){
    myChart.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
  }, 1000);
  getInfo();  
});

//Border Chart
const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};

//Charts
var myChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: time,        
    datasets: [{
      backgroundColor: "rgba(1,1,122, 0.6)",
      borderColor: "white",
      data: humidity,
      fill: true,
      label: 'Humedad',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      pointStyle: 'black',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
    },
    options: {
    responsive: true,
      plugins: {
        chartAreaBorder: {
          borderColor: 'white',
          borderWidth: 2,
          borderDash: [0, 0],
          borderDashOffset: 2,
        }        
      }
    },
    plugins: [chartAreaBorder]
  }); 

var myChart2 = new Chart('myChart2', {
  type: "line",
  data: {
    labels: time,
    datasets: [{
      backgroundColor: "rgba(255, 0, 0, 0.4)",
      borderColor: "white",
      data: temperature,
      label: 'Temperatura',
      fill: true,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  },
  options: {
    responsive: true,
    plugins: {
      chartAreaBorder: {
        borderColor: 'white',
        borderWidth: 2,
        borderDash: [0, 0],
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});

var myChart3 = new Chart('myChart3', {
  type: "line",
  data: {
    labels: time,
    datasets: [{
      backgroundColor: "rgba(128, 128, 128, 0.4)",
      borderColor: "white",
      data: smoke,
      label: 'Humo',
      fill: true,
      pointStyle: 'black',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  },
  options: {
    responsive: true,
    plugins: {
      chartAreaBorder: {
        borderColor: 'white',
        borderWidth: 2,
        borderDash: [0, 0],
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});

var myChart4 = new Chart('myChart4', {
  type: "line",
  data: {
    labels: time,
    datasets: [{
      backgroundColor: "rgba(255, 255, 0, 0.4)",
      borderColor: "white",
      data: light,
      fill: true,
      label: 'Luz',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7
  }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      chartAreaBorder: {
        borderColor: 'white',
        borderWidth: 2,
        borderDash: [0, 0],
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});