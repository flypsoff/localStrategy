const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

// we use this for disguise password in file .env
dotenv.config()

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)

// use this middleware for "reading" req.body
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')

app.use('/', require('./routes/user'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started...'))