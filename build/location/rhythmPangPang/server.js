const express = require('express');
const fs = require('fs');
const pug = require('pug');
const path = require('path');
const app = express();

const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "c16st28",
//     password: "Z9U7dffwthoQloDI",
//     database: "c16st28"
// });

connection.connect();

app.set('view engine','pug')
app.set('views','./views')

app.use(express.static("public"));
app.use(express.json());
app.locals.pretty = true;
app.use(express.urlencoded({
    extended: true
}));

app.get('/',(req,res) => {
    res.render('rhythmPangPang');
});

app.post('/', async (req, res, next)=>{
    let saveName = req.body.saveName;
    let saveScore = req.body.saveScore;
    let intSaveScore = Number(req.body.saveScore.replace(',',''));
    connection.query(
        `insert into game_ranking (rank_name, rank_score, rank_time) values (?,?, now())`
    , [saveName, intSaveScore], (error)=>{
        if(error) throw error;
    });
    connection.query('select * from game_ranking order by rank_score desc',(error,result)=>{
        fs.writeFileSync('./public/script/gameRanking.json',JSON.stringify(result));
        if(error) throw error;
    });
    res.redirect('/');
});


app.listen(30028,()=>{
    console.log('run');
});