
///los 3 pasos logicos que siempre hay que hacer///// 

//----1.-agarrar las cosas del DOM----
//----2.-Escuchar mediantee el eventlisteners----
//----3.-reaccionar a las manipulaciones de clases---

export function inicializarModoClaro () {

    // tomamos el checkbox por su ID
    const toggle = document.querySelector('#toggle-oscuro');
    //tomamos el body completo ya que js tiene atajos para el
    const body = document.body;


    //leemos la memoria del navegador
    //buscamos que valor tiene guardado en la palabra 'tema'

    const temaGuardado = localStorage.getItem('modo');

    // aqui dice si el usuario prefiere el tema en modo claro
    if(temaGuardado==='claro') {
        body.classList.add('tema-claro'); // se cambia al modo claro
        toggle.checked = true;     // deja el toggle en modo "check"
    }

    /// ahora mediante addEventListener, usaremos "Change"
    /// esto es para escuchar el evento change del checkbox
    toggle.addEventListener('change',()=>{

        //reaccionamos a la toma de desicion si el boton se activa o no

        if(toggle.checked === true) {//encendemos el boton      
            body.classList.add('tema-claro');
            localStorage.setItem('tema','claro')// guardamos la configuracion del usario en el LS
            
        }else{//apagamos el boton
            body.classList.remove('tema-claro');
            localStorage.setItem('tema','oscuro') // guardamos la configuracion del usuario en el LS
            
        }
    });

}


