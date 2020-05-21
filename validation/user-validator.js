module.exports.useValidate = (req, res, next) => {
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
    next();
}