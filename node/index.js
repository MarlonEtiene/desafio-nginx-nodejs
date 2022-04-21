const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const data = require('./MOCK_DATA.json');
const rand = Math.round(Math.random() * data.length)
const name = data[rand].first_name + ' ' + data[rand].last_name;

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) VALUES ('` + name + `')`
connection.query(sql)

var result = '<h2>Lista de nomes cadastrada no banco de dados.</h2><br><ul>';
connection.query('select * from people', function (err, rows, fields) {
    if (err) throw err;
    for(i=0; i < rows.length; i++) {
        result += '<li>' + rows[i].name + '</li>'
    }
    result += '</ul>'
});
connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks</h1>' + result)
})

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)
})