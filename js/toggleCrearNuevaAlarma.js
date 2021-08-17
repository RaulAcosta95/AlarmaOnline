function toggleCrearNuevaAlarma(){
    let formNuevaAlarma = `              
    <form>
        <label for="tituloAlarma">Título:</label>
        <input type="text" id="tituloAlarma" name="tituloAlarma" placeholder="Tu título">
        <label for="horaAlarma">Hora:</label>
        <input type="time" id="horaAlarma" name="horaAlarma" placeholder="Hora">
        <button id="botonEnviar" type="button" onclick="agregaAlarma();imprimirAlarmas()">Enviar</button >
    </form>
    `;
    let formCrearNuevaAlarma = document.getElementById('crearNuevaAlarma');        
    if(formCrearNuevaAlarma.hasChildNodes()){
            formCrearNuevaAlarma.innerHTML = null;
        } else {
            formCrearNuevaAlarma.innerHTML = formNuevaAlarma;
        }
} 