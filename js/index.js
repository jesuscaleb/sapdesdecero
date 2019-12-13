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
                digits:true
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
                required:"Ingrese su correo electronico",
                email:"Correo invalido"
            },
            txtcel:{
                required:"Ingrese su numero telefonico",
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
            //TODO: Realizar una alerta o mensaje para mostrar al completar correctament el formulario
            //$(form).preventDefault();
            // alert('enviado');
            $.ajax({
                url: './data/submit.php',
                type: 'POST',
                
                data: $(form).serialize(),
                success: function(data) {
                    // $('#answers').html(data);
                    // var data = jQuery.parseJSON(data); Si php retorna un array string por json_encode
                    console.log(data);
                        
                    $('#reg-form').remove();
                    $('#reg-form2').remove();
                    $('.response').append("<img class='mx-auto' src='img/icons/disp.png'>");
                    $('.response').append("<h3 class='mx-auto text-center'>Registro correcto</h3>");
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
            digits:true
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
            required:"Ingrese su correo electronico",
            email:"Correo invalido"
        },
        txtcel2:{
            required:"Ingrese su numero telefonico",
            digits:"Ingrese solo numeros"
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
        //TODO: Realizar una alerta o mensaje para mostrar al completar correctament el formulario
        //$(form).preventDefault();
        // alert('enviado');
        $.ajax({
            url: './data/submit.php',
            type: 'POST',
            
            data: $(form).serialize(),
            success: function(data) {
                // $('#answers').html(data);
                // var data = jQuery.parseJSON(data); Si php retorna un array string por json_encode
                console.log(data);
                
                // Clear the form
                validator2.resetForm();
                
            },
            error: function (e) {
                console.log(e);
            }            
        });
        return false;
    }
});
});

