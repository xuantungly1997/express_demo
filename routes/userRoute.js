const express = require('express');
const controller = require('../controller/userController');

const router = express.Router();

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', (req, res) => {
    res.render('users/createUser')
})

router.post('/create', controller.create)

router.get('/:id', controller.viewDetail)

module.exports = router;