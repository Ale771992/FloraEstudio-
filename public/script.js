document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let nombre = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let celular = document.getElementById('cellphone').value;
    let mensaje = document.getElementById('message').value;    

    if (nombre && email && celular && mensaje) {
        // Enviar el formulario utilizando fetch API
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, celular, mensaje })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            document.getElementById('contact-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con el envío del formulario.');
        });
    } else {
        alert('Por favor llena todos los campos requeridos')
    }
});
