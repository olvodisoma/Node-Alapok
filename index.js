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

app.get('/author/:author',(request,response) => {
    const {author} = request.params
    db.query('SELECT title FROM books WHERE author=? ORDER BY title',[author],(error,result)=>{
        if(error)
            console.log("Hiba")
        else
            response.send(result)
    })
})

app.get('/categ/:categ/year/:year',(request,response) => {
    const {categ,year} = request.params
    db.query('SELECT author,title,year FROM books WHERE category=? AND year>=?',[categ,year],(error,result)=>{
        if(error)
            console.log("Hiba")
        else
            response.send(result)
    })
})

app.get('/id/:id',(request,response) => {
    const {id} = request.params
    db.query('SELECT author,title,year,category FROM books WHERE id=?',[id],(error,result)=>{
        if(error)
            console.log("Hiba")
        else
            response.send(result)
    })
})

app.listen(5000,() => console.log('server listening on port'))