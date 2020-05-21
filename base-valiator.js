const {checkBody} = require('express-validator');

function checkvalidate(req,user) {
    req.checkBody("email", "Email is required").notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
    req.checkBody("email", "Email is not invalid").matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/); //Validate định dạng email sử dụng regex, sử dụng hàm matches()
    req.checkBody("phonenumber","Phone is required").notEmpty();
    req.checkBody("phonenumber","Phone is not valid").matches(/^[0-9]$/);
    return req.validationErrors();
}

module.exports = {
    checkvalidate: checkvalidate
};