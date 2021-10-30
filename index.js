const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());
const TAFFY = require('taffy');

let SCREET_TOKEN  = '4de3d53ad45933d7269fb6c80fe75c2';

var todo_db = TAFFY([
    {
        title:'lorem ipsum dolor',
        complete:false
    },
    {
        title:'lorem ipsu m dolor',
        complete:false
    }
]);

app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/all',(req,res)=>{
    var data = todo_db().get()
    res.set({
        'Content-type':'application/json'
    })
    res.send(data);
})

app.post('/add',(req,res)=>{
    todo_db.insert(req.body)
    res.set({
        'Content-type':'application/json'
    })
    res.send({
        "msg":"Insert Success"
    });
})

app.delete('/delete/:id',(req,res)=>{
    todo_db({___id:req.params.id}).remove()
    res.set({
        'Content-type':'application/json'
    })
    res.send({
        "msg":"Delete Success",
    });
})

app.put('/update/:id',(req,res)=>{
    todo_db({___id:req.params.id}).update(req.body);
    res.send({
        "msg":"Update Success",
    });
})

let port = process.env.PORT || 3000;
let host = '0.0.0.0';
app.listen(port,host,()=>{
    console.log(`run in ${host}:${port}`);
})
