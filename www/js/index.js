let data = [];

async function getData(){
  const setting = {
    "async": true,
    "crossDomain": true,
    "url": "https://erickmaya.pythonanywhere.com/raspberry/features",
    "method": "GET"
  };

  $.ajax(setting).done(function (response) {
    data = response;
    let infoLuz;
    let infoHumo;
    let temperatura;
    let humedad;
    $.each(data, function(i,v){
      if(data.length - 1 == i){
        infoLuz = v.luz;
        infoHumo = v.humo;
        temperatura = v.temperatura;
        humedad = v.humedad;
        
      }
    });
    document.getElementById('luz').innerHTML = infoLuz;
    document.getElementById('temp').innerHTML = temperatura + ' °C';
    document.getElementById('humedad').innerHTML = humedad + ' %';
    document.getElementById('humo').innerHTML = infoHumo;
  });
}

//Execute when the page is load
$(function () {
  getData();
});

//Endpoints
// var generalButton = document.getElementById('on-humo-off');
// generalButton.onclick(function(e){
//   e.preventDefault();
//   const setting = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://erickmaya.pythonanywhere.com/raspberry/features",
//     "method": "PUT",
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "data": JSON.stringify({
//       "show": true,
//     })
//   };
  
//   $.ajax(setting).done(function (response) {
//     console.log(response);
//   });
// });