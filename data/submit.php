<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['form'])){
            $formulario = $_POST['form'];
            $curso = trim($_POST["selcur"]);
            $nombre_completo = strip_tags(trim($_POST["txtnom"]));
            $nombre_completo = str_replace(array("\r","\n"),array(" "," "),$nombre_completo);
            $email = filter_var(trim($_POST["txtemail"]), FILTER_SANITIZE_EMAIL);
            $telefono = filter_var(trim($_POST["txtcel"]), FILTER_SANITIZE_NUMBER_INT);
        }else if(isset($_POST['form2'])){
            $formulario = $_POST['form2'];
            $curso = trim($_POST["selcur2"]);
            $nombre_completo = strip_tags(trim($_POST["txtnom2"]));
            $nombre_completo = str_replace(array("\r","\n"),array(" "," "),$nombre_completo);
            $email = filter_var(trim($_POST["txtemail2"]), FILTER_SANITIZE_EMAIL);
            $telefono = filter_var(trim($_POST["txtcel2"]), FILTER_SANITIZE_NUMBER_INT);
        }
        $id_origen = 1;
        $creado = $fecha_origen = date("Y-m-d"); // La base de datos pide obligatoriamente este formato de fecha
        $empresa_usa_sap = '-';
        $medio_contacto = 'PW';
        $estado = 1;
        $inscrito = 0;
        $modo_insercion = 'A';
        $urgente = "false";
        $observacion = 'Suscripcion por Sap desde cero';
        $ocupacion = '';
        $nombre_empresa = '';
        $nro_documento = '';
        $ruc_empresa = '';
        
        
        try {
            $myPDO = new PDO('pgsql:host= {host};dbname={dbname}', '{user}', '{password}');

			if($myPDO) {
				$query = "INSERT INTO crm.interesado(id_origen, creado,
		        fecha_origen, nombre_completo, telefono, email, ocupacion, nombre_empresa, empresa_usa_sap, medio_contacto, estado, inscrito, curso, modo_insercion, observacion, urgente, nro_documento, ruc_empresa) 
                VALUES ('". $id_origen . "', '" . $creado  ."', '". $fecha_origen . "', '" . $nombre_completo. "', '" . $telefono . "',
                 '".$email."', '".$ocupacion."', '".$nombre_empresa."', '" . $empresa_usa_sap . "',
                 '".$medio_contacto."', ".$estado.", ".$inscrito.", '".$curso."', '".$modo_insercion."', '".$observacion."',
                  ".$urgente.", '".$nro_documento."', '".$ruc_empresa."');";
				$result = $myPDO->exec( $query );
				if( ! $result ) {
                    // print_r($myPDO->errorInfo()); 
                    die; // mal query 
                    $mensaje = 'Hubo un problema con el envio, por favor inténtelo más tarde. ';
                    $estado = 'error';
                    $info = $myPDO->errorInfo();
                }else{
                    $mensaje = 'El mensaje se envió correctamente';
                    $estado = 'exito';
                    $info = '';
                }
                $data = ['mensaje' => $mensaje, 'estado' => $estado, 'curso'=> $curso, 'info' => $info];
                echo json_encode($data);
			}else{
                $mensaje = 'No podemos enviar sus datos, por favor inténtelo más tarde. ';
                $estado = 'error';
                $info = $myPDO->errorInfo();
                $data = ['mensaje' => $mensaje, 'estado' => $estado, 'info' => $info];
                echo json_encode($data);
            }
		} catch (PDOException $e){
 			// report error message
 			// print_r($myPDO->errorInfo());
            $e->getMessage(); die; 
            
            $mensaje = 'Hubo un problema con el envio, por favor intentelo más tarde.';
            $estado = 'error';
            $data = ['mensaje' => $mensaje, 'estado' => $estado, 'info' => $e->getMessage()];
            echo json_encode($data);  // no conexion a la bd
		}
    } else {
        http_response_code(403);
        $mensaje = 'Hubo un problema con el envio, por favor intentelo más tarde.';
        $estado = 'error';
        $data[] = ['mensaje' => $mensaje, 'estado' => $estado, 'info' => 'Error 403'];
        echo json_encode($data);
    }

?>