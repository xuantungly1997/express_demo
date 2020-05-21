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
        users: matchUser,
        value: q
    })
}

module.exports.create = (req, res, next) => {
    const formValue = {
        id : shortid.generate(),
        name: req.body.name,
        age: req.body.age
    }

    let errors = [];
    if(!req.body.name) {
        errors.push('Name not require!!!');
    }
    if(!req.body.age) {
        errors.push('Age not require!!!');
    }
    if(isNaN(req.body.age)){
        errors.push('Age is not number!!!');
    }

    if(errors.length) {
        res.render('users/createUser',{
            errors: errors,
            value: req.body
        })
        return;
    }
    console.log(formValue);
    db.get('users').push(formValue).write();
    res.redirect('/user');
}

module.exports.viewDetail = (req, res, next) => {
    var idUser = req.params.id;
    var user = db.get('users').find({ id: idUser }).value();
    res.render('users/viewUser', { user: user })
}

module.exports.delete = (req, res, next) => {
    var idUser = req.params.id;
    db.get('users')
        .remove({ id: idUser })
        .write();
    res.redirect('/user')
}

module.exports.getEdit = (req, res, next) => {
    db.read(); //read current datas in db
    let idUser = req.params.id;
    let dataup = db.get('users').find({ id: idUser }).value(); // find and collect data via "uid"
    res.render('users/editUser', { dataup }); // Send values from data to Table
}

module.exports.updateUser = (req, res, next) => {
    db.read(); //read current datas in db
    let idUser = req.body.id; // transfer "id" from TABLE to "uid"
    /* Do actual updation of User via ID */
    db.get('users')
        .find({ id: idUser })
        .assign({ name: req.body.name, age: req.body.age })
        .write();
        console.log(db.get('users')
        .find({ id: idUser }).value());
        
    /* Do actual updation of User via ID ends here */
    res.status(200);
    res.redirect('/user');
}