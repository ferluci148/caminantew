
var map;
var murallas = new Array();
var latitud = 41.67097948393865;
var longitud = -3.6769259916763985;
let posMurallas = 0;
let marker;
let tzoom = parseInt(slider.value);
let contadorTiempo=0;
let intervaloPosicion=null;

let colortrazado= "#12D997"
colorTrazado.value=colortrazado;
//Obtiene la localización actual del sipositivo en latitud, longitud
navigator.geolocation.getCurrentPosition(pos => {
    //  alert( pos.coords.latitude+","+ pos.coords.latitude)
    latitud = pos.coords.latitude;
    longitud = pos.coords.longitude;
    
}) 
// Paramos el proceso de ejecución de la página para que google map no de error
// de satutación
function delay(n) {
    console.log(n);
    return new Promise(function (resolve) {
        setTimeout(resolve, n);
    });
}

let icono; let iconoRojo; let iconoVerde; let iconoAmbar;


icono = {
    url: "./imagenes/rav.jpg", // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

function inicio() {
    tzoom = parseInt(slider.value);
    map = new google.maps.Map(
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud, longitud),//latitud,longitud),//
        // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
        zoom: tzoom, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
    });

    // Añade un marcador al mapa
    google.maps.event.addListener(map, 'click', function (event) {
        delay(5)
        
        datolatitud_longitud = event.latLng.toString();
        console.log( datolatitud_longitud)
        // Hcemos como latitud longitu por defeccto las seleciona al crear el marcador
        // Por si cambiam os de zoom en el mapa
        let posicionActulamapa=datolatitud_longitud.split(",");
      
        latitud = posicionActulamapa[0].substr(1,posicionActulamapa[0].length)
        longitud =  posicionActulamapa[1].substr(1,posicionActulamapa[0].length-1)
      
        murallas.push(datolatitud_longitud);
        //  datolatitud_longitud = datolatitud_longitud.substring(1,datolatitud_longitud.length - 1)

        var fileName = "./imagenes/Logo.png";

        icono = {
            url: "./imagenes/rav.jpg", // url
            scaledSize: new google.maps.Size(tzoom, tzoom), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };


        marker = new google.maps.Marker({
            position: event.latLng,
            icon: icono,
            map: map,
            nombre: 'Pepino'
        });

        map.setCenter(event.latLng);


      /*  google.maps.event.addListener(marker, 'click', function () {

            arrayDatos.push(this)

            if (estadoParaMarcador == 0) {
                this.setIcon(iconoVerde);
            }
            else { this.setIcon(iconoRojo); }
        });*/
        //enviaLL(lineaAutobus,datolatitud_longitud);
        leeDireccion(event.latLng);
    });

    
// Intervalo de detectar nueva posición
  intervaloPosicion= setInterval(function(){
    
    navigator.geolocation.getCurrentPosition(pos => {
    //    console.log( pos.coords.latitude+","+ pos.coords.latitude)
        latitud = pos.coords.latitude;
        longitud = pos.coords.longitude;
   //    console.log("paso")
        let latlng= new google.maps.LatLng(latitud, longitud)
        dibujaMarcador(latlng) 
});
},18000); 


}
function dibujaMarcador(latlng){
    let llatlng=latlng;
console.log("ll"+latlng+"  "+llatlng);
    icono = {
        url: "./imagenes/rav.jpg", // url
        scaledSize: new google.maps.Size(tzoom, tzoom), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };


    marker = new google.maps.Marker({
        position:  llatlng,
        icon: icono,
        map: map,
        nombre: 'Pepino'
    });

    map.setCenter(latlng);
    leeDireccion(llatlng);
}



// Obtiene la longitud y la latitud correspondiente al clic 
// y copia los datos en cajas de texto. Tambien obtiene la 
// dirección del lugar donde hacemos clic
function leeDireccion(latlng) {
    //alert("leeDireccion  "+latlng )
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {      
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {                   
                    MuestraDireccion(latlng, results[0].formatted_address)
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}

function MuestraDireccion(latlng, direccion) {
//alert("MuestraDireccion  "+ latlng+","+ direccion)
    //cLatitud.value= direccion;
    let listac=document.getElementById("listaCalles") ;
    let elemento=document.createElement("option")
    elemento.value=latlng;
    elemento.text=direccion;
    listac.appendChild(elemento)
    Trazar_onclick();
}

let polygonAndado=null;
function Trazar_onclick() {
   
    var tipo_trazo;
     colortrazado = colorTrazado.value;//"blue";
    let grosorTrazado=grosorLinea.value;
    cRecinto = ""
    var posiciones = "[";
    for (i = 0; i < listaCalles.options.length; i++) {
        posiciones = posiciones + "new google.maps.LatLng" + listaCalles[i].value + ",";
        cRecinto = cRecinto + listaCalles[i].value + ",";
    }
    posiciones = posiciones.substr(0, posiciones.length - 1);
     
    if (tipo_trazo == "recinto") {
        posiciones = posiciones + ",new google.maps.LatLng" +listaCalles[i].value + "]";
    }
    else { posiciones = posiciones + "]"; }

    if (listaCalles.options.length > 0) {
        var polygon = "new google.maps.Polyline({" +
            "path:" + posiciones + "," +
            "strokeColor:'" + colortrazado + "'," +
            "strokeOpacity: 2," +
            "strokeWeight:"+grosorTrazado+"," +
            "geodesic: true})";


         /***********************************  */
      
        eval(polygon).setMap(map);
        polygonAndado = "new google.maps.Polyline({" +
        "path:" + posiciones + "," +
        "strokeColor:'#f50f0f'," +
        "strokeOpacity: 2," +
        "strokeWeight:"+grosorTrazado+"," +
        "geodesic: true})";
        /***********************************  */
        

        
    }
    murallas = new Array();
}



inicio();

function MidemeAreaRecinto() {

    var posiciones = "";
    var distanciaTotal = 0;
    for (i = 0; i < murallas.length; i++) {

        var pi = murallas[i].toString().replace('(', "");
        pi = pi.toString().replace(')', "");
        api = pi.split(",");



        posiciones = posiciones + ", new google.maps.LatLng(" + api[0] + "," + api[1] + ")";//  eval(pi));//


    }


    Trazar_onclick();
    pos = 0;
    murallas = new Array();
    posiciones = posiciones.substring(1, posiciones.length);
    posiciones = "[" + posiciones + "]";
    // alert(posiciones)
    //(41.70901237677913, -3.5927865446865326),(41.70914052762599, -3.5912845076381927),(41.70822744726788, -3.590683692818857),(41.70769881586997, -3.5927436293422943),(41.708147351880946, -3.5933444441616302),
    //var nueva_york = new google.maps.LatLng(40.715, -74.002); 
    //var area = google.maps.geometry.spherical.computeArea([nueva_york, sevilla, buenos_aires]);
   // var area = google.maps.geometry.spherical.computeArea(eval(posiciones));
   // document.getElementById("cMidemeArea").value = area + " m2.";
}