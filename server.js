const express = require('express')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sqlkurs',
    password: 'sqlkurs',
    database: 'mondial'
  })
connection.connect()


const app = express()
const port = 3000

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    connection.query('SELECT * from country', (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows
        })
      })
})


app.get('/city', (req, res) => {
    let name = "%" + req.query.name + "%"
 
    let sqlQueryText = 'select * \
    from city where name like ?'
    connection.query(sqlQueryText, [name], (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows,
            searchAction: 'city',
            searchField: 'name'
        })
      })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })




