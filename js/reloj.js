let hora;
let minuto;
let segundo;
window.onload=function(){
    mostrarHora();
}
function mostrarHora(){
    const tiempo=new Date();
    hora = tiempo.getHours();
    minuto = tiempo.getMinutes();
    segundo = tiempo.getSeconds();

    //Usa  la función que arregla los numeros
    hora = agregarCeroReloj(hora);
    minuto = agregarCeroReloj(minuto);
    segundo = agregarCeroReloj(segundo);

    //Pasarlo al elemento reloj en el html (el div)
    document.getElementById('reloj').innerHTML=`${hora}:${minuto}:${segundo}`;
    
    //Cada cuando se va a actualizar el reloj
    t=setTimeout('mostrarHora()',1000);
}

//Arregla los números que sean menores a 10, de otra manera saldría sin 0
function agregarCeroReloj(i){
    if (i<10 || i.length<2) {
        i='0' + i;
    }
    return i;
}