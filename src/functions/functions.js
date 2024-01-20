import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alert(message, ico, focus){
    onFocus(focus);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:message,
        icon:ico
    });
}

function onFocus(foc){
    if(foc !==''){
        document.getElementById(foc).focus()
    }
}