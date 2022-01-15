const express = require('express');
const router = require('./routes/index')
const cors = require('cors')
const  connectDb = require('./config/Connection');
const app = express()


app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('./uploads'));


// MongoDB file
connectDb()


const APP_PORT = 5000;

// routes will be like http://localhost:5000/api/v1/product
app.use('/v1', router)

app.listen(APP_PORT, () => {
    console.log(`Server is running on the PORT ${APP_PORT}`)
})