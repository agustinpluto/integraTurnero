console.clear()
const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql')
const {Sequelize} = require('sequelize')

dotenv.config()

const DB_PORT = process.env.DB_PORT
const PORT = process.env.PORT

// SEQUELIZE


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'integra'
})

const conexion = con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
    con.query("CREATE DATABASE IF NOT EXISTS integra", function (err, result) {
        if (err) throw err;
        console.log("Database created or ready for use!")
    })
})


const app = express();

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(express.json());

app.listen(PORT, () =>
    console.log(`Servidor en puerto ${PORT}`)
)

// GET USERTS
app.get('/account/login', async (req, res) => {

    var sql = "SELECT * FROM users"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
    })

})

// POST USERT
app.post('/account/register', async (req, res) => {

    
    var sql = "INSERT INTO users SET ?"

    

    try {

        const {nombre, apellido, email, contraseña, rol} = req.body

        const len = {nombre, apellido, email, contraseña, rol}

        const con = getCon();
    
        return await con.query(sql, [len])
        
    } catch (error) {
        console.log(error)
        console.log('No se registro nada.')
        res.end()
    }


    // var sql = "INSERT INTO users(nombre, apellido, email, contraseña, rol) VALUES('Agustin', 'Pluto', 'agus@agus.com', '1234', '1')";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    //     res.send('Registered!')
    // })
})

// DELETE USER
app.delete('/account/delete', (req, res) => {

    var sql = "DELETE FROM users WHERE id = '7'"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("ID 2 DELETED");
        res.send('Deleted!')
    })
})

// UPDATE USER
app.post('/account/update', (req, res) => {
    var sql = "UPDATE users SET apellido = 'Agustin' WHERE id ='5'"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("ID 2 UPDATED");
        res.send('Updated!')
    })
})
