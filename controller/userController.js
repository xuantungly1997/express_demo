const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => res.render('users/listUser', {
    users: db.get('users').value()
})

module.exports.search = (req, res) => {
    let q = req.query.q;
    let matchUser = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/listUser', {
        users : matchUser
    })
}

module.exports.create = (req, res, next) => {
    req.body.id = shortid.generate();
    console.log(req.body);
    db.get('users').push(req.body).write();
    res.redirect('/user');
}

module.exports.viewDetail = (req, res, next) => {
    var idUser = req.params.id;
    var user = db.get('users').find({ id: idUser }).value();
    res.render('users/viewUser', { user: user })
}