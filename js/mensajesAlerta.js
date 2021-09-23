function mensajesAlerta(id){
    switch (id) {
        case 1:alert('¡Añade tu alarma a favoritos para tenerla siempre a la mano!');
            break;
        case 2:alert('¡Comparte esta aplicación con tus amigos!');
            break;
        case 3:alert('¡Es muy bueno tenerte aquí!');
            break;
        case 4:alert('¡Alarma Online!');
            break;
        case 5:alert('¡Tu Alarma Online!');
            break;
        case 6:alert('¡Tu Alarma Favorita!');
            break;
        case 7:alert('¡Gracias por estar aquí!');
            break;
        case 8:alert('¡Hoy es un día estupendo!');
            break;
        case 9:alert('¡Instala esta aplicación en tu dispositivo!');
            break;
        case 10:alert('¡Puedes instalar esta aplicación!');
            break;
        default:
            break;
    }
}

mensajesAlerta(Math.round(Math.random()*(10-1)+parseInt(1)));
