const md5 = require('md5');
const db = require('../db');

module.exports.login = (req, res) => res.render('auth/login')
module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = db.get('users').find({ email: email }).value();

    if(!user) {
        res.render('auth/login',{
            errorLogin : 'user does not exist!!',
            value: req.body
        })
        return;
    } 
    let getHardPass = md5(password);
    
    if(user.password !== getHardPass){
        res.render('auth/login',{
            errorLogin : 'wrong assword!!',
            value: req.body
        })
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/user');

}