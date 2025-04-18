//##################################################
//GET - Ver datos
//##################################################

//Solicita el id y lo guarda en una variable
const id = prompt("Ingrese el ID del usuario que desea ver:");

//Verifica que se haya ingresado algún dato
if (id) {

    //Realiza la solicitud HTTP GET concatenando el id
    //a la url con acentos graves ` y encerrando la variable en ${}

    fetch(`https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba/${id}`)

        //Apartado que convierte los datos a formato JSON
        .then(response => {

            //Primero verifica que se haya completado la solicitud correctamente (!response.ok)
            //Además, verifica que el usuario no haya escrito sólo espacios en el prompt (id.trim() === "")

            //La función integrada .trim() elimina espacios al inicio y al final de una cadena en JavaScript
            //Si después de eliminar los espacios al inicio y al final se obtiene una cadena vacía "",
            //significa que esta constaba de sólo espacios

            //Se verifica que no sean sólo espacios porque en ese caso, dirá que sí se encontró el usuario
            //solicitado con todos sus datos en undefined (esto debido a que si no encuentra el ID, retornará
            //un JSON vacío {} )
            
            if (!response.ok || id.trim() === "") {

                //Si se cumple alguna de las dos condiciones anteriores arroja un error con un mensaje
                //personalizado que el .catch(error) podrá utilizar más adelante
                throw new Error('Usuario no encontrado');
                //Si arroja error, no ejecutará los .then que vengan a continuación y saltará directamente
                //al .catch(error)
            };

            //En caso de no cumplirse las condiciones (es decir, todo salió como se esperaba), se convierten
            //los datos a formato JSON y se retornan
            return response.json();
        })

        //Se guardan los datos del usuario en la variable usuario
        .then(usuario => {

            //Se arroja un alert concatenando el texto con las variables que necesitamos mostrar

            //Para mostrar un valor específico se accede a la variable donde se alojan todos los datos
            //usuario, luego se coloca un punto y seguido el nombre de la clave con el valor al cuál 
            //queremos acceder

            //Ejemplo: si queremos acceder a los nombres del usuario alojado en la variable usuario,
            //se coloca usuario.names

            alert(`Usuario encontrado:\n\nID: ${usuario.id}\nNombre: ${usuario.names}\nApellido: ${usuario.surnames}\nNúmero de teléfono: ${usuario.phonenumber}\nDirección: ${usuario.address}\nNombre de usuario: ${usuario.username}\ne-mail: ${usuario.email}`);
        })

        //El código salta aquí si en algún momento previo se arrojó un error con throw new Error
        .catch(error => {

            //En caso de hacerlo, lanza un alert con el error que ya habíamos creado previamente

            //En este caso error.message es la cadena 'Usuario no encontrado' que le habíamos pasado
            //a los paréntesis de la función throw new Error()
            alert('Error: ' + error.message);
        });

//Si no se ingresó nada en el campo para ingresar el id, se arroja un mensaje a través de un alert
} else {
    alert('No ingresaste ningún ID');
};

//##################################################
//GET - Crear nuevo usuario
//##################################################

//Solicita todos los datos del nuevo usuario
let newNames = prompt("Ingrese los nombres del nuevo usuario:");
let newSurnames = prompt("Ingrese los apellidos del nuevo usuario:");
let newPhoneNumber = prompt("Ingrese el número de teléfono del nuevo usuario:");
let newAddress = prompt("Ingrese la dirección del nuevo usuario:");
let newUserName = prompt("Ingrese el nombre de usuario del nuevo usuario:");
let newPassword = prompt("Ingrese la contraseña del nuevo usuario:");
let newEmail = prompt("Ingrese el e-mail del nuevo usuario:");

//En primer lugar verifica que todos los campos hayan sido llenados, es decir, no haya datos vacíos
if (newNames && newSurnames && newPhoneNumber && newAddress && newUserName && newPassword && newEmail) {

    //En segundo lugar, si se pasó la anterior verificación, se comprueba que ningún dato sean sólo espacios
    //(haciendo uso de la función .trim() mencionada en la línea 21)
    if (newNames.trim() !== "" && newSurnames.trim() !== "" && newPhoneNumber.trim() !== "" && newAddress.trim() !== "" && newUserName.trim() !== "" && newPassword.trim() !== "" && newEmail.trim() !== "") {
        
        //Se realiza la solicitud a la API
        fetch('https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba', {

            //Se especifica con qué método se realiza la solicitud (en este caso POST)
            method: 'POST',

            //Se especifica que se le pasará el nuevo usuario en formato JSON
            headers: {
                'Content-Type': 'application/json'
            },

            //Se le pasan los datos del nuevo usuario
            body: JSON.stringify({

                //Lo que va antes de los dos puntos deben ser las claves que ya se encontraban predefinidas
                //en la API, mientras que lo que va después de los dos puntos son las variables en las que
                //se encuentran alojados los datos del nuevo usuario (creadas de la línea 79 a la 85)
                names: newNames,
                surnames: newSurnames,
                phonenumber: newPhoneNumber,
                address: newAddress,
                username: newUserName,
                password: newPassword,
                email: newEmail
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo crear el usuario');
                };
                return response.json();
            })
            .then(nuevoUsuario => {
                alert(`✅ Usuario añadido correctamente:\n\nID: ${nuevoUsuario.id}\nNombre: ${nuevoUsuario.names}\nApellido: ${nuevoUsuario.surnames}\nNúmero de teléfono: ${nuevoUsuario.phonenumber}\nDirección: ${nuevoUsuario.address}\nNombre de usuario: ${nuevoUsuario.username}\nEmail: ${nuevoUsuario.email}`);
            })
            .catch(error => {
                alert('❌ Error: ' + error.message);
            });
    } else {
        alert('❌ Error: Algunos datos ingresados no son válidos');
    }
} else {
    alert('Debe ingresar todos los datos para crear un nuevo usuario.');
}

//##################################################
//PUT - Editar usuarios
//##################################################

const idEdit = prompt("Ingrese el ID del usuario que desea editar:");
let opt = prompt("Qué desea editar?\n\n1. Nombres\n2. Apellidos\n");

if (opt === "1") {
    if (idEdit) {
        fetch(`https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba/${idEdit}`)
            .then(response => {
                if (!response.ok || idEdit.trim() === "") {
                    throw new Error('Usuario no encontrado');
                };
                return response.json();
            })
            .then(usuario => {
                let newNamesEdit = prompt(`Nombre actual: ${usuario.names}\nIngrese el nuevo nombre:`);

                if (newNamesEdit) {
                    if (newNamesEdit.trim() !== "") {
                        fetch(`https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba/${idEdit}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                names: newNamesEdit,
                                surnames: usuario.surnames,
                                phonenumber: usuario.phonenumber,
                                address: usuario.address,
                                username: usuario.username,
                                password: usuario.password,
                                email: usuario.email,
                            })
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('No se pudo editar el usuario');
                                }
                                return response.json();
                            })
                            .then(usuarioEditado => {
                                alert(`✏️ Usuario editado con éxito:\n\nID: ${usuarioEditado.id}\nNombre: ${usuarioEditado.names}\nApellido: ${usuarioEditado.surnames}\nTeléfono: ${usuarioEditado.phonenumber}\nDirección: ${usuarioEditado.address}\nUsuario: ${usuarioEditado.username}\nEmail: ${usuarioEditado.email}`);
                            })
                            .catch(error => {
                                alert('❌ Error: ' + error.message);
                            });
                    } else {
                        alert('❌ Error: El nombre ingresado no es válido');
                    };
                } else {
                    alert('No ingresaste ningún dato');
                };
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    } else {
        alert('No ingresaste ningún ID');
    };
} else if (opt === "2") {
    if (idEdit) {
        fetch(`https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba/${idEdit}`)
            .then(response => {
                if (!response.ok || idEdit.trim() === "") {
                    throw new Error('Usuario no encontrado');
                };
                return response.json();
            })
            .then(usuario => {
                let newSurnamesEdit = prompt(`Apellido actual: ${usuario.surnames}\nIngrese el nuevo apellido:`);

                if (newSurnamesEdit) {
                    if (newSurnamesEdit.trim() !== "") {
                        fetch(`https://6802778a0a99cb7408e9b21a.mockapi.io/api/prueba/prueba/${idEdit}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                names: usuario.names,
                                surnames: newSurnamesEdit,
                                phonenumber: usuario.phonenumber,
                                address: usuario.address,
                                username: usuario.username,
                                password: usuario.password,
                                email: usuario.email,
                            })
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('No se pudo editar el usuario');
                                }
                                return response.json();
                            })
                            .then(usuarioEditado => {
                                alert(`✏️ Usuario editado con éxito:\n\nID: ${usuarioEditado.id}\nNombre: ${usuarioEditado.names}\nApellido: ${usuarioEditado.surnames}\nTeléfono: ${usuarioEditado.phonenumber}\nDirección: ${usuarioEditado.address}\nUsuario: ${usuarioEditado.username}\nEmail: ${usuarioEditado.email}`);
                            })
                            .catch(error => {
                                alert('❌ Error: ' + error.message);
                            });
                    } else {
                        alert('❌ Error: El apellido ingresado no es válido');
                    };
                } else {
                    alert('No ingresaste ningún dato');
                };
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    } else {
        alert('No ingresaste ningún ID');
    };
} else {
    alert('Opción no válida o aún no disponible');
};
