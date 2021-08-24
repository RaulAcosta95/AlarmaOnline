<?php 

$destino = 'raulacostaservicio@hotmail.com';

$asunto = 'ALARMA_ONLINE_MENSAJE';
$mensaje = $_POST ['mensaje'];
$email = $_POST ['email'];

$header = 'Mensaje desde Aplicación Alarma Online';

mail($destino, $asunto, $mensaje, $header);

// header("Location:index.html");
echo "
<script>
    alert('Mensaje Enviado');
    console.log("???");

</script>"
echo "
<script>
    setTimeout(\"location.href = 'index.html' \",1000);
    console.log("???");
</script>
"

?>