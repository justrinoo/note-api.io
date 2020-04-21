const express = require('express') ;
const bodyParser = require('body-parser');
// const auth = require('../app/middleware/auth');
const app  = express();
const myLogger = require('../app/middleware/logged');
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(auth)
app.use(myLogger)

const mongoose = require('mongoose') ;
const dbConfig = require('../config/database.note');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(()=>{
    console.log('Successfully Connected Database')
}).catch(()=>{
    console.log('Error Connection')
})

app.get('/',(req,res)=>{
    res.send('welcome to my api');
})

require('../app/routes/note.routes')(app);

app.listen(port,()=>{
    console.log('Server running at port 3000')
})