const path = require('path')
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config.js')
const cors = require('cors')
///crear el servidor de express

const app = express()

//conexion a la base de datos 
dbConnection()

//cors 
app.use(cors())

//Directorio publico 

app.use(express.static('public'))

//Lectura y parseo del body 
app.use(express.json())

//rutas

//Autenticacion
app.use('/api/auth', require('./routes/auth.js'))

//Eventos CRUD
app.use('/api/events', require('./routes/events.js'))

app.use('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/index.html'))
})

//Escuchar peticiones 

app.listen(process.env.PORT, () => {
     console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})