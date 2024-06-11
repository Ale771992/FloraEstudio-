const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alejandra77$',
    database: 'flora_estudio',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Servir archivos estaticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')))

// Ruta para manejar el envío del formulario
app.post('/submit-form', (req, res) => {
    console.log('Recibiendo los datos del formulario')
    const { nombre, email, celular, mensaje } = req.body;

    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Celular:', celular)
    console.log('Mensaje:', mensaje);
    
    if (nombre && email && celular && mensaje) {
        const query = 'INSERT INTO clientes (nombre, email, celular, mensaje) VALUES (?, ?, ?, ?)';
        db.query(query, [nombre, email, celular, mensaje], (err, result) => {
            if (err){
                console.log("Error al insertar en la basd de datos:", err)
                res.status(500).send('Error interno del servidor')
            } else {
                res.send('Formulario enviado y datos almacenados en la base de datos');

            }
           
        });
    } else {
        res.send('Por favor, rellena todos los campos');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
