const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0514',
    database : 'parking_system'
    // host: "localhost",
    // user: "c16st28",
    // password: "Z9U7dffwthoQloDI",
    // database: "c16st28"
});

connection.connect();

app.set('view engine','pug')
app.set('views','./views')

//app.use(express.json()); 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.locals.pretty = true;

app.get('/',(req,res) => {
    res.render('mainPage');
});
app.get('/main',(req,res) => {
    res.render('mainPage');
});

app.get('/in',(req,res) => {
    res.render('inPage');
    connection.query('select use_area from use_history where exit_time is null',(error,result)=>{
        fs.writeFileSync('./public/js/json/useAreaData.json',JSON.stringify(result));
        if(error) throw error;
    });
    connection.query(
        "select * from use_history where exit_time is null",(error, result)=>{
        fs.writeFileSync('./public/js/json/outData.json',JSON.stringify(result));
        if(error) throw error;
    });
    connection.query('select * from use_history',(error,result)=>{
        fs.writeFileSync('./public/js/json/parkingSystemData.json',JSON.stringify(result));
        if(error) throw error;
    });
});


app.get('/out',(req,res) => {
    res.render('outPage');
    connection.query(
        "select * from use_history where exit_time is null",(error, result)=>{
        fs.writeFileSync('./public/js/json/outData.json',JSON.stringify(result));
        if(error) throw error;
    });
    connection.query('select use_area from use_history where exit_time is null',(error,result)=>{
        fs.writeFileSync('./public/js/json/useAreaData.json',JSON.stringify(result));
        if(error) throw error;
    });
    connection.query('select * from use_history',(error,result)=>{
        fs.writeFileSync('./public/js/json/parkingSystemData.json',JSON.stringify(result));
        if(error) throw error;
    });
    
});

app.get('/manage',(req,res) => {
    res.render('managePage');
    connection.query('select * from use_history',(error,result)=>{
        fs.writeFileSync('./public/js/json/parkingSystemData.json',JSON.stringify(result));
        if(error) throw error;
    });
});

app.post('/in', async (req,res) => {
    const useArea = req.body.useArea;
    const entranceTime = req.body.entranceTime;
    const carNumber = req.body.carNumber;
    connection.query('insert into use_history (car_num, entrance_time, use_area) values (?,?,?)'
    , [carNumber, entranceTime, useArea], (error)=>{
        res.redirect('/main');
        if(error) throw error;
    });
    connection.query('select * from use_history',(error,result)=>{
        fs.writeFileSync('./public/js/json/parkingSystemData.json',JSON.stringify(result));
        if(error) throw error;
    });
});

app.post('/out', async (req, res, next)=>{
    let outTime = req.body.outTime;
    let outPrice = req.body.outPrice;
    let outCarNumber = req.body.outCarNumber;
    console.log(outTime, outPrice, outCarNumber);
    connection.query(
        `update use_history set exit_time = (?), sale_amount=(?) where car_num = (?) and exit_time is null`
    , [outTime, outPrice, outCarNumber], (error)=>{
        if(error) throw error;
        console.log(error);
    });
    connection.query('select * from use_history',(error,result)=>{
        fs.writeFileSync('./public/js/json/parkingSystemData.json',JSON.stringify(result));
        if(error) throw error;
        console.log(error);
    });
    res.redirect('/main');
});


app.listen(55528,()=>{
    console.log('run 111');
});