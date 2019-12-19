// Select Element Rule Function
$.validator.addMethod("valueNotEquals", function(value, element, arg){
    return arg != value;
   }, "Value must not equal arg.");

// This is a functions that scrolls to #{blah}link
function goToByScroll() {
    
    $('html,body').animate({
        scrollTop: $("#jumphere").offset().top
    }, 'slow');
}

$(document).on('click', '#saltar', function (e) {

    e.preventDefault();
    // Call the scroll function
    goToByScroll();
});

// Forzar descarga de un archivo
function SaveToDisk(fileURL, fileName) {
    // para navegadores que no son IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // para IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}


// Registration Form Validation
$(document).ready(function(){

        $('.header-section').load('./sections/header.html');
        $('.footer-section').load('./sections/footer.html');

        var validator = $('#reg-form').validate({
            rules:{
            txtnom:{
                required:true
            },
            txtemail:{
                required:true,
                email:true
            },
            txtcel:{
                required:true,
                digits:true,
                minlength: 7
            },
            selcur:{
                valueNotEquals: "default"
            },
            chkpol:{
                required:true
            }
        },
        messages:{
            txtnom:{
                required:"Ingrese sus nombres completos"
            },
            txtemail:{
                required:"Ingrese su Correo electrónico",
                email:"Correo invalido"
            },
            txtcel:{
                required:"Ingrese su numero telefonico",
                minlength: "Ingrese como mínimo 7 caracteres",
                digits:"Ingrese solo numeros"
            },
            selcur:{
                valueNotEquals: "Selecciona un curso"
            },
            chkpol:{
                required: "Este campo es obligatorio"
            }
        },
        errorPlacement: function( label, element ) {
            if( element.attr( "name" ) === "audience[]" || element.attr( "name" ) === "event_services[]" ) {
                element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
            } else {
                label.insertBefore( element ); // standard behaviour
            }
        }
        ,
        submitHandler: function(form) {
            // Mientras carga el envio se bloquea el boton y luego realiza la animacion de carga.
            $('.btn-enviar').attr('disabled', 'true');
            $('.btn-enviar')
            .append('<span id="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            var nombre = $('#reg-form').find('input[name="txtnom"]').val();
            var email = $('#reg-form').find('input[name="txtemail"]').val();
            var numero = $('#reg-form').find('input[name="txtcel"]').val();
            var curso = $('#reg-form').find('select[name="selcur"]').val();
            $.ajax({
                // url: './data/submit.php',
                url: 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLSfWbdkHlukkd1dKkFn2tHcQ0vscIWZQlQuzfY4ZBtve5qv2-w/formResponse',
                type: 'POST',
                
                // data: $(form).serialize(),
                data: {"entry.869624654": nombre, "entry.753489023": email, "entry.376184160": numero, "entry.115324886": curso},
                
                success: function(data) {
                   
                    
                    console.log(data);
                    // Eliminan los formularios de la página 
                    $('#loading').remove();
                    $('#reg-form').remove();
                    $('.form-title').remove();
                    $('.frm-title').remove();
                    $('.after-post').removeClass('col-md-8');
                    $('.after-post').addClass('col-md-12');
                    $('#reg-form2').remove();
                    $('.btn-enviar').attr('disabled', 'false');
                    
                    SaveToDisk("files/"+ curso +".pdf", "TEMARIO " + curso);
                    var src_icon = 'img/icons/exito.png';
                    var mensaje = 'Se envió el mensaje con éxito.';
                    $('.response').append("<img class='mx-auto' src='"+ src_icon +"'>");
                    $('.response').append("<h4 class='mx-auto text-center'>"+mensaje+"</h4>");
                    $('.response')
                    .append("<p class='mx-auto text-center'>Se descargará el temario del curso seleccionado.</p>");
                    $('.response')
                    .append("<p class='mx-auto text-center'>Si no se descarga el archivo, haga click <a target='_blank' href='files/"+curso+".pdf'>Aquí</a>.</p>");
                    // Clear the form
					validator.resetForm();
                },
                error: function (e) {
                    console.log(e);
                }            
            });
            return false;
        }
    });

    var validator2 =  $('#reg-form2').validate({
        rules:{
        txtnom2:{
            required:true
        },
        txtemail2:{
            required:true,
            email:true
        },
        txtcel2:{
            required:true,
            digits:true,
            minlength: 7
        },
        selcur2:{
            valueNotEquals: "default"
        },
        chkpol2:{
            required:true
        }
    },
    messages:{
        txtnom2:{
            required:"Ingrese sus nombres completos"
        },
        txtemail2:{
            required:"Ingrese su Correo electrónico",
            email:"Correo invalido"
        },
        txtcel2:{
            required:"Ingrese su numero telefonico",
            digits:"Ingrese solo numeros",
            minlength: "Ingrese máximo 7 caracteres"
        },
        selcur2:{
            valueNotEquals: "Selecciona un curso"
        },
        chkpol2:{
            required: "Este campo es obligatorio"
        }
    },
    errorPlacement: function( label, element ) {
        if( element.attr( "name" ) === "audience[]" || element.attr( "name" ) === "event_services[]" ) {
            element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
        } else {
            label.insertBefore( element ); // standard behaviour
        }
    }
    ,
    submitHandler: function(form) {
        // Mientras carga el envio se bloquea el boton y luego realiza la animacion de carga.
        $('.btn-enviar').attr('disabled', 'true');
        $('.btn-enviar')
        .append('<span id="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
        var nombre = $('#reg-form2').find('input[name="txtnom2"]').val();
        var email = $('#reg-form2').find('input[name="txtemail2"]').val();
        var numero = $('#reg-form2').find('input[name="txtcel2"]').val();
        var curso = $('#reg-form2').find('select[name="selcur2"]').val();
        $.ajax({
            // url: './data/submit.php',
            url: 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLSfWbdkHlukkd1dKkFn2tHcQ0vscIWZQlQuzfY4ZBtve5qv2-w/formResponse',
            type: 'POST',
            // data: $(form).serialize(),
            data: {"entry.869624654": nombre, "entry.753489023": email, "entry.376184160": numero, "entry.115324886": curso},
            
            success: function(data) {
                
                
                console.log(data);
                // Eliminan los formularios de la página 
                $('#loading').remove();
                $('#reg-form').remove();
                $('.form-title').remove();
                $('.frm-title').remove();
                $('.after-post').removeClass('col-md-8');
                $('.after-post').addClass('col-md-12');
                $('#reg-form2').remove();
                $('.btn-enviar').attr('disabled', 'false');
                
                SaveToDisk("files/"+ curso +".pdf", "TEMARIO " + curso);
                var src_icon = 'img/icons/exito.png';
                var mensaje = 'Se envió el mensaje con éxito.';
                $('.response').append("<img class='mx-auto' src='"+ src_icon +"'>");
                $('.response').append("<h4 class='mx-auto text-center'>"+mensaje+"</h4>");
                $('.response')
                .append("<p class='mx-auto text-center'>Se descargará el temario del curso seleccionado.</p>");
                $('.response')
                .append("<p class='mx-auto text-center'>Si no se descarga el archivo, haga click <a target='_blank' href='files/"+curso+".pdf'>Aquí</a>.</p>");
                // Clear the form
                validator.resetForm();
            },
            error: function (e) {
                console.log(e);
                
            }            
        });
        return false;
    }
});
});

