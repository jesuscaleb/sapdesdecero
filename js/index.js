// Select Element Rule Function
$.validator.addMethod("valueNotEquals", function(value, element, arg){
    return arg != value;
   }, "Value must not equal arg.");

// Registration Form Validation
$(document).ready(function(){



        $('#reg-form').validate({
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
            form.preventDefault();
            alert('Enviado');
            /*
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) {
                    // $('#answers').html(response);
                    console.log(response);
                    validator.resetForm();
                    
                }            
            });*/
            
        }
    });

    $('#reg-form2').validate({
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
        form.preventDefault();
        alert('Enviado');
        /*
        $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize(),
            success: function(response) {
                // $('#answers').html(response);
                console.log(response);
                validator.resetForm();
                
            }            
        });*/
        
    }
    });
});

function goToByScroll() {
    // Remove "link" from the ID
    // id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $(".jumphere").offset().top
    }, 'slow');
}

$(".saltar").click(function(e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    goToByScroll();
});