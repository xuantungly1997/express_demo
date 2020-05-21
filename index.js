const express = require('express')
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middleware/login-middleware');

const app = express()
const port = 3000
app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', (req, res) => res.render('demoPug',{
    name: 'Xuan Tung',
    age: 20
}))

app.use('/user',  authMiddleware.authMiddle, userRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))