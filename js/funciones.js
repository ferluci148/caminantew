
let slider = document.getElementById("cambioResilucionMapa");
slider.addEventListener("change", () => {
    inicio();
    document.getElementById("output").value = slider.value;
    Trazar_onclick();
}, false);

grosorLinea.addEventListener("change", () => {
    inicio();
    outpuGrosort.value = grosorLinea.value;
    Trazar_onclick()
}, false);

document.getElementById("reiniciar").addEventListener("click", () => {
    
   latitud = 41.67097948393865;
longitud = -3.6769259916763985;
      listaCalles.innerHTML=""
    navigator.geolocation.getCurrentPosition(pos => {
        //  alert( pos.coords.latitude+","+ pos.coords.latitude)
        latitud = pos.coords.latitude;
        longitud = pos.coords.longitude;
        inicio();
        
    })
    
    clearInterval( intervaloPosicion)
    inicio()
 /******************************************** */
  
    eval(polygonAndado).setMap(map);
}, false);
startTime()
//Reloj
function startTime() {
    
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
   
    document.getElementById("tiempo").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
   
    var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}