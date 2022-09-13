import { config } from "./dbconfig.js";
import express from "express";
import mysql from 'mysql';

const app = express()
app.use(express.json())
const db=mysql.createConnection(config)

app.get('/',(request,response) => {
    db.query('SELECT id,author FROM books GROUP BY author ORDER BY author',(error,result)=>{
        if(error)
            console.log("Hiba")
        else
            response.send(result)
    })
})

app.listen(5000,() => console.log('server listening on port'))