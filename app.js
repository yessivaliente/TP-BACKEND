const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

// Configuración de Body Parser para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de Body Parser para parsear application/json
app.use(bodyParser.json());

// Configuración de conexión a MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'y171092*',
    database: 'basededatos'
});

// Conexión a MySQL
connection.connect(error => {
    if (error) {
        console.error('Error de conexión a MySQL:', error);
    } else {
        console.log('Conectado a MySQL correctamente.');
    }
});
// Configurar middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html','detalle-peluche.html'));
});

// Ruta para la página de detalles del peluche
app.get('/detalle-peluche', (req, res) => {
    const pelucheId = req.query.id;
    connection.query('SELECT * FROM peluches WHERE id = ?', [pelucheId], (error, results) => {
        if (error) {
            console.error('Error en la consulta: ', err);
            res.status(500).send('Error en la consulta');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Peluche no encontrado');
        }
    });
});

// Ruta para servir la página de detalles del peluche
app.get('/detalle', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'detalle_peluche.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


// Ruta para manejar el POST del formulario de registro de clientes
app.post('/registrarCliente', (req, res) => {
    const { nombre, direccion, ciudad, cp, email, genero } = req.body;

    // Query para insertar un nuevo cliente en la tabla Clientes
    const sql = `INSERT INTO Clientes (Nombre, Direccion, Ciudad, codigo_postal, Email, Genero)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    // Parámetros para la consulta SQL
    const params = [nombre, direccion, ciudad, cp, email, genero];

    // Ejecutar la consulta SQL
    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            console.error('Error al registrar el cliente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.status(200).json({ message: 'Cliente registrado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
// Ruta para manejar el PUT de modificación de clientes
app.put('/modificarCliente/:id', (req, res) => {
    const clienteID = req.params.id;
    const { nombre, direccion, ciudad, cp, email, genero } = req.body;

    // Query para actualizar el cliente en la tabla Clientes
    const sql = `UPDATE Clientes
                 SET Nombre = ?, Direccion = ?, Ciudad = ?, codigo_postal = ?, Email = ?, Genero = ?
                 WHERE ClienteID = ?`;

    // Parámetros para la consulta SQL
    const params = [nombre, direccion, ciudad, cp, email, genero, clienteID];

    // Ejecutar la consulta SQL
    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            console.error('Error al modificar el cliente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.status(200).json({ message: `Cliente con ID ${clienteID} modificado correctamente` });
    });
});



// Ruta para manejar el GET de detalles de peluche por ID
app.get('/detalle-peluche/:id', (req, res) => {
    const pelucheID = req.params.id;

    // Query para obtener los detalles de un peluche por ID
    const sql = `SELECT * FROM peluches WHERE id = ?`;

    // Parámetros para la consulta SQL
    const params = [pelucheID];

    // Ejecutar la consulta SQL
    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener los detalles del peluche:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: `Peluche con ID ${pelucheID} no encontrado` });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
});



