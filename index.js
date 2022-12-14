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

app.put('/:id/:year',(request,response)=>{
    const {id,year} = request.params
    db.query('UPDATE books SET year=? WHERE id=?',[year,id],(error,result)=>{
    if(error)
        console.log("Hiba")
    if(result.affectedRows == 1)
        response.send({message:"Sikeres adatmódosítás."})
    else
        response.send({message:"Sikerestelen adatmódosítás."})
    })
})

app.put('/',(request,response)=>{
    const {id,category,year} = request.body
    db.query('UPDATE books SET category=?, year=? WHERE id=?',[category,year,id],(error,result)=>{
    if(error)
        console.log("Hiba")
    if(result.affectedRows!=0)
        response.send({message:"Sikeres adatmódosítás."})
    else
        response.send({message:"Sikertelen adatmódosítás."})
    })
})

app.post('/',(request,response)=>{
    const {category,year,title,author} = request.body
    db.query('INSERT INTO books VALUES (null,?,?,?,?);',[author,title,year,category],(error,result)=>{
    if(error)
        console.log("Hiba")
    if(result.insertId)
        response.send({message:`Sikeres adatmódosítás. id:${result.insertId}`})
    else
        response.send({message:"Sikertelen adatmódosítás."})
    })
})

app.delete('/:id',(request,response)=>{
    const {id} = request.params
    db.query('DELETE FROM books WHERE id=?',[id],(error,result)=>{
    if(error)
        console.log("Hiba")
    if(result.affectedRows!=0)
        response.send({message:`Sikeres törlés.`})
    else
        response.send({message:"Sikertelen törlés."})
    })
})

//A felhasználó látni szeretné hogy a kiválasztott kategóriában milyen könyvek vannak(szerző,cím)

app.get('/category/:category',(request,response)=>{
    const {category} = request.params
    db.query('SELECT author,title FROM books WHERE category=?',[category],(error,result)=>{
    if(error)
        console.log("Hiba")
    else
        response.send(result)
    })
})

app.listen(5000,() => console.log('server listening on port'))