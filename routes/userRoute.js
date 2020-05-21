const express = require('express');
const controller = require('../controller/userController');

const router = express.Router();

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', (req, res) => {
    res.render('users/createUser')
})

router.post('/create', controller.create)

router.get('/detail/:id', controller.viewDetail)

router.get('/delete/:id', controller.delete)

router.get('/edit/:id', controller.getEdit)

router.post('/update', controller.updateUser)

module.exports = router;