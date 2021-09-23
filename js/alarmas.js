let alarmasActivas = [];
// localStorage.clear();//AQUI

if (localStorage.getItem('alarmasLocalStorage') != null) {
    alarmasActivas = JSON.parse(localStorage.getItem('alarmasLocalStorage'));
    console.log(alarmasActivas);
} else{
    console.log('No hay alarmas');
}
imprimirAlarmas();

function agregaAlarma(){
    let tituloAlarmaRecibido = document.getElementById('tituloAlarma').value;
    let horaAlarmaRecibido = document.getElementById('horaAlarma').value;

    console.log(horaAlarmaRecibido);

    if(tituloAlarmaRecibido.lenght > 18){
        alert('Título demasiado largo');
        return null;
    } else if(horaAlarmaRecibido==""){
        alert('Hora no valida');
        return null;
    }

    if(tituloAlarmaRecibido == ""){
        tituloAlarmaRecibido = "Mi Alarma Online"
    }


    alarmasActivas.push({
        tituloAlarma: tituloAlarmaRecibido,
        horaAlarma: horaAlarmaRecibido,
    })
    localStorage.setItem('alarmasLocalStorage',JSON.stringify(alarmasActivas));
    console.log(alarmasActivas);
    toggleCrearNuevaAlarma();
}

function imprimirAlarmas(){
    let alarmasHTML = ``;
    let alarmasActivasContenedor = document.getElementById('alarmasActivas');
    for (let i = 0; i < alarmasActivas.length; i++) {
        alarmasHTML += `
        <div class="alarmaActiva">
            <p class="tituloAlarma">${alarmasActivas[i].tituloAlarma}</p>
            <p class="horaAlarma">${alarmasActivas[i].horaAlarma}</p>
            <button class="botonBorrarAlarma" onclick="borrarAlarma(${i})">X</button>
        </div>
        `
    }
    alarmasActivasContenedor.innerHTML = alarmasHTML;
}

function borrarAlarma(i){
    alarmasActivas.splice(i, 1);
    localStorage.setItem('alarmasLocalStorage',JSON.stringify(alarmasActivas));
    imprimirAlarmas();
}

buscaAlarmasActivas();
function buscaAlarmasActivas(){
    console.log('BuscaAlarmasActivas');
    const tiempo=new Date();
    const tiempoActual = tiempo.getHours()+":"+tiempo.getMinutes();
    for (let i = 0; i < alarmasActivas.length; i++) {
        if(alarmasActivas[i].horaAlarma==tiempoActual){
            console.log('Suena Alarma ' + i);
            sonarAlarma(i);
            break;
        }        
    }
    t=setTimeout('buscaAlarmasActivas()',60000);

}
function sonarAlarma(i){
    let alarmaActiva = document.querySelector('.alarmaSonando');
    
    alarmaActiva.innerHTML=`
    <div id="alarmaSonando">
        <img src="./imagenes/volume.svg" alt="Icono de sonido">
        <p class="tituloAlarmaSonando">${alarmasActivas[i].tituloAlarma}</p> <br>
        <p class="horaAlarmaSonando">${alarmasActivas[i].horaAlarma}</p>
        <audio autoplay id="audioAlarma" loop>
            <source src="./sonidos/sonidoalarma.mp3" type="audio/ogg">
        </audio>
        <button onclick="apagarAlarma()">OK</button>
    </div>
    `
    notifyMe(i);
}
function notifyMe(i) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(alarmasActivas[i].tituloAlarma);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(alarmasActivas[i].tituloAlarma);
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
function apagarAlarma(){
    let alarmaActiva = document.querySelector('.alarmaSonando');
    alarmaActiva.innerHTML="";
}

