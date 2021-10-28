const express = require('express');
const app = express();
app.use(express.json());
const TAFFY = require('taffy');

var todo_db = TAFFY([
    {
        title:'lorem ipsum dolor',
        complete:false
    },
    {
        title:'lorem ipsum dolor',
        complete:false
    }
]);

app.get('/',(req,res)=>{
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

app.listen(8080,()=>{
    console.log(`run in http://localhost:8080`);
})