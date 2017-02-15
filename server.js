const express = require('express');
const hbs = require("hbs");
var app = express();
const fs = require('fs');



hbs.registerPartials(__dirname+'/views/partials');
//__dirname =  diretorio absoluto

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
//para passar argumentos para os helper usar
//nome_da_func texto exemplo:  screamIt welcomePage

app.set('view engine', 'hbs');

app.use((req,res,next)=>{
//somente quando eu chamo o next a aplicacao continua
var now = new Date().toString();

var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n',(erro)=>{
    if(erro){
        console.log("Ocorreu um erro ao gravar o arquivo");
    }
});
next();
});



app.use((req,res,next)=>{
res.render('maintenance.hbs');
});

app.use(express.static(__dirname+"/public"));


app.get('/',(req,res)=>{
    // res.send("<h1>Bem Vindo ao meu Servidor com Express</h1>");
    // res.send({
    //     name: "Vitor",
    //     profissao: "Devensolvedor",
    //     linguagens:[
    //         'Swift',
    //         'Node.js'
    //     ]

    // })
    res.render('home.hbs',{
        name: "Vitor Ferraz",
        pageTitle: "Home Page!!",
        welcomePage:"Bem vindo ao meu site!",
         
    })
});



app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About Page"
    });
});

app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        name: "Vitor Ferraz",
        pageTitle: "Home Page!!",
        welcomePage:"Bem vindo ao meu site!",
         
    })
});


app.get('/bad',(req,res)=>{
    res.send({
        error:'Erro ao acessa a pagina'
    })
});

app.listen(3000,()=>{
    console.log("O Servidor esta rodando na porta 3000");
});