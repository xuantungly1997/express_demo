const express = require('express')
const shortid = require('shortid');
const app = express()
const port = 3000
app.set('view engine', 'pug')
app.set('views', './views')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Set some defaults (required if your JSON file is empty)
db.defaults({  users: [] })
  .write()
// let users = [
//     {id: 1 , name: 'Xuan'},
//     {id: 2 , name: 'Tung'},
//     {id: 3 , name: 'Yen Bai'}
// ]

app.get('/', (req, res) => res.render('demoPug',{
    name: 'Xuan Tung',
    age: 20
}))
app.get('/user', (req, res) => res.render('users/listUser', {
    //  users: users
     users: db.get('users').value()
     }))

app.get('/user/search', (req, res) => {
    let q = req.query.q;
    let matchUser = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/listUser', {
        users : matchUser
    })
})

app.get('/user/create', (req, res) => {
    res.render('users/createUser')
})

app.post('/user/create', (req, res, next) => {
    req.body.id = shortid.generate();
    console.log(req.body);
    db.get('users').push(req.body).write();
    res.redirect('/user');
})

app.get('/user/:id', (req, res) => {
    var idUser = req.params.id;
    var user = db.get('users').find({ id: idUser }).value();
    res.render('users/viewUser', { user: user })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))