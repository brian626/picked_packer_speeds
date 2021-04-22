const express = require('express')

require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const db = require('./db')
const userRouter = require('./routes/user-router')
const loginRouter = require('./routes/login-router')
const orderRouter = require('./routes/order-router')
const analyticsRouter = require('./routes/analytics-router')

const app = express()
const apiPort = 3000

const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    collection: 'mySessions'
})

store.on('error', function(error) {
    console.log(error);
})

const corsOptions = {
    origin: [
        'http://localhost:8000'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(require('express-session')({
    secret: 'My secret',
    store: store,
    saveUninitialized: true,
    resave: true,
}))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/order', orderRouter)
app.use('/api/analytics', analyticsRouter)
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('???')
    } else {
        res.redirect('/login')
    }
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
