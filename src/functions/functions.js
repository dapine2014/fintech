import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';

export function show_alert(message, ico, focus){
    onFocus(focus);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:message,
        icon:ico
    });
}

export  function formDataEstudent(){
    console.log("valor de id : "+document.getElementById("id").value);
    return {
             "id":document.getElementById("id").value,
             "nombre": document.getElementById("nombre").value,
             "apellido": document.getElementById("apellido").value,
             "edad": document.getElementById("edad").value,
             "email": document.getElementById("email").value,
             "ciudad": document.getElementById("ciudad").value
         }
}

export  function  clearDataEstuden(){
         document.getElementById("id").value = "";
         document.getElementById("nombre").value = "";
         document.getElementById("apellido").value = "";
         document.getElementById("edad").value = "";
         document.getElementById("email").value = "";
         document.getElementById("ciudad").value = "";
}

export function editDataStuden(id,nombre, apellido, edad, email, ciudad){
    document.getElementById("id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("email").value = email;
    document.getElementById("ciudad").value = ciudad;
}

export function showMessage(sms, ico){
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:sms,
        icon:ico
    });
}

export function  showConfirm(sms,ico){
    const MySwal = withReactContent(Swal);
    let status = false;
    MySwal.fire({
        title: sms,
        icon:ico,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "SI",
        denyButtonText: "NO"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            status = true
            return status;
        } else if (result.isDenied) {
            status = false;
            return status;
        }
    });
}



function onFocus(foc){
    if(foc !==''){
        document.getElementById(foc).focus()
    }
}