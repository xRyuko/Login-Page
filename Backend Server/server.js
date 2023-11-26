import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
const port = 8000;

//connect to mysql database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//verify the database connection
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/", (req, res) => {
    return res.json("From Backend Side.");
})

//save data into database
app.post("/signup", (req, res) => {
    const sql = "INSERT INTO account (`email`, `password`) VALUES (?)";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

//retrieve data from database
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM account WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if (data.length > 0){
            console.log(data);
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
});