const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.get('/',(req,res)=> {
    fs.readdir(`./files`,(err,files)=> {
      res.render('index',{files:files});
    })
})

app.get("/file/:filename",(req,res)=> {
    fs.readFile(`./files/${req.params.filename}`,'utf8',(err,data)=> {
        if(err) throw err;
        res.render('show', {filename: req.params.filename, data:data});
    })
})

app.get("/edit/:filename",(req,res)=> {
        res.render('edit', {filename: req.params.filename});
})

app.post("/edit",(req,res)=> {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, (err)=> {
        if(err) throw err;
        res.redirect('/');
    });
})

app.post('/create',(req,res)=> {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=> {
        if(err) throw err;
        res.redirect('/');
    });
})


app.listen(5000);