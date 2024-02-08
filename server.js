const express = require('express');
const cors= require('cors');
const router= require('./routes');
const Connection = require('./repositories/db.js');

const app = express()
app.use(cors());
app.use(express.json());
app.use('/', router)

app.listen(8001, () => {
    console.log('listening on port 8001')
})

Connection.connect((error)=>{
    if(error) throw error
    console.log('mysql db connected')
})