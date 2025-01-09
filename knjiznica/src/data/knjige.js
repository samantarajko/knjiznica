
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "student.veleri.hr",
    user: "riwa",
    password: "11",
    port: 3306,
    database: "riwa",
  });

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    return res.send({data: results, message: 'list of books'})
  });
});

app.get("/api/knjige/:id", (req, res) => {
  let id = req.params.id;
  connection.query("SELECT * FROM knjiga WHERE id=?", id, (error, results) => {
    if (error) throw error;
    return res.send({data: results, message: 'one book by id'})
  });
});
app.get("/api/knjige/naslov/:naslov", (req, res) => {
  let naslov = req.params.naslov;
  connection.query("SELECT * FROM knjiga WHERE naslov=?", naslov, (error, results) => {
    if (error) throw error;
    return res.send({data: results, message: 'one book by naslov'})
  });
});

app.post("/api/unos_knjige", (req, res) => {
  const data = req.body;
  let knjiga = [[data.naslov, data.autor, data.opis, data.slika, data.stanje]]
  connection.query("INSERT INTO knjiga (naslov, autor, opis, slika, stanje) VALUES ?", [knjiga], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/api/rezerv_knjige", (req, res) => {
  const data = req.body;
  let rezervacija = [['2024-10-30', data.id_knjiga, data.id_korisnik]]
  connection.query("INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/korisnik", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;
    return res.send({data: results, message: 'list of users'})
  });
});


/*
    request - slanje zahtjeva s klijentske strane
    response - slanje odgovora sa serverske strane

    npm install -g nodemon
*/

app.listen(port, () => {
    console.log("Server running at port: " + port);
});
