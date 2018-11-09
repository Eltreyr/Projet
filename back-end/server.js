import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Membre from './models/Membre';

const app = express();
var mysql = require('mysql');

app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vvdliege"
  });

const router = express.Router();

app.use(bodyParser.json());

con.connect(function(err) {
    if (err) throw err;
        console.log("Connecttion established successfully!");
});

app.route('/membres').get((req, res) =>{
var sql = "SELECT * from view_xmembregradeclub";
  con.query(sql, function (err, result) {
    if (err) 
        console.log(err);
    else
        res.json(result);
  });
});


router.route('/membre/:id').get((req, res) =>{
    var sql = "SELECT * FROM view_xmembregradeclub WHERE idMembre = " + req.params.id;
    con.query(sql, function (err, result) {
    if (err) 
        console.log(err);
    else
       res.json(result);
    });
});

router.route('/membre/add').post((req, res) =>{
    var sql = "INSERT INTO membre(nomMembre, prenomMembre, cotisationFede, dateNaissance, sexeMembre, adresse, cp, ville, email, phoneMembre, numeroRCAE, idClub) VALUES ('";
    sql += req.body.nomMembre + "','";
    sql += req.body.prenomMembre + "',";
    sql += req.body.cotisationFede + ",'";
    sql += req.body.dateNaissance + "',";
    sql += req.body.sexeMembre + ",'";
    sql += req.body.adresse + "','";
    sql += req.body.cp + "','";
    sql += req.body.ville + "','";
    sql += req.body.email + "','";
    sql += req.body.phoneMembre + "','";
    sql += req.body.numeroRCAE + "',";
    sql += req.body.idClub + ")";

    con.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else{
            sql = "INSERT INTO grademembres(idMembre, idGrade, dateObtention) VALUES(";
            sql += result.insertId + ",";
            sql += req.body.idGrade + ",'";
            sql += Date.now() + "')";
            con.query(sql, function (err, result){
                if (err) 
                    console.log(err);
                else
                    res.json(result);
            });
        }
      });
});

router.route('/membre/update/:id').post((req, res) => {
console.log(req.body);

    var sql = "UPDATE membre SET nomMembre= '";
   sql += req.body.nomMembre + "', prenomMembre = '";
   sql += req.body.prenomMembre + "', cotisationFede = ";
   sql += req.body.cotisationFede + ", dateNaissance = '"
   sql += req.body.dateNaissance + "', sexemembre = ";
   sql += req.body.sexeMembre + ", adresse = '";
   sql += req.body.adresse + "', cp = '";
   sql += req.body.cp + "', ville = '";
   sql += req.body.ville + "', email ='";
   sql += req.body.email + "', phoneMembre = '";
   sql += req.body.phoneMembre + "',numeroRCAE = '";
   sql += req.body.numeroRCAE + "', idClub= ";
   sql += req.body.idClub + " ";
   sql += "WHERE idMembre = " + req.params.id ;

    con.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else{
            sql = "INSERT INTO grademembres(idMembre, idGrade, dateObtention) VALUES(";
            sql += req.params.id + ",";
            sql += req.body.idGrade + ",'";
            sql += Date.now() + "')";
            con.query(sql, function (err, result){
                if (err) 
                    console.log(err);
                else
                    res.json(result);
            });
        }
    });
});

router.route('/membre/delete/:id').get((req, res) =>{
    var sql = "DELETE FROM grademembres WHERE idMembre = " + req.params.id;
    con.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else{
            var sql = "DELETE FROM membre WHERE idMembre = " + req.params.id;
            con.query(sql, function (err, result) {
            if (err) 
                console.log(err);
            else
                res.json('Remove successfully!'); 
            });
        }    
    });
});

app.route('/grades').get((req, res) =>{
    var sql = "SELECT * from grade";
      con.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else
            res.json(result);
      });
    });
    
    
    router.route('/grade/:id').get((req, res) =>{
        var sql = "SELECT * FROM grade WHERE idGrade = " + req.params.id;
        con.query(sql, function (err, result) {
        if (err) 
            console.log(err);
        else
           res.json(result);
        });
    });

    app.route('/clubs').get((req, res) =>{
        var sql = "SELECT * from club";
          con.query(sql, function (err, result) {
            if (err) 
                console.log(err);
            else
                res.json(result);
          });
        });
        
        
        router.route('/club/:id').get((req, res) =>{
            var sql = "SELECT * FROM club WHERE idClub = " + req.params.id;
            con.query(sql, function (err, result) {
            if (err) 
                console.log(err);
            else
               res.json(result);
            });
        });

app.use('/', router);

app.get('/', (req, res) => res.send("Hello world"));

app.listen(4000, () => console.log('Express server is running on port 4000'));