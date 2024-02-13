const express = require('express');
const cors= require('cors');
const cookieParser = require('cookie-parser');  
const router= require('./routes');
const Connection = require('./repositories/db.js');

const app = express();
app.use(cookieParser());
// app.set("trust proxy", 1);
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(express.json());
app.use('/api', router)

app.listen(8001, () => {
    console.log('listening on port 8001')
})

Connection.connect((error)=>{
    if(error) throw error
    console.log('mysql db connected')
})