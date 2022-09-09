import express, { request } from 'express';

import { diakok } from './data.js';

const app = express();
app.use(express.json());

app.get('/',(request,response)=>{
    //response.send('Saját szerverünk küldi ezt az üzenetet!')
    response.send(diakok)
})

app.get('/:id',(request,response)=>{
    const {id} = request.params
    const filteredArr=diakok.filter(obj=>obj.id==id)
    response.send(filteredArr)
})

app.post('/',(request,response)=>{
    const {id,nev,osztaly}=request.body
    diakok.push({id:id,nev:nev,osztaly:osztaly})
    response.send(diakok)
})

app.get('*',(request,response)=>{
    response.status(404).send('Az oldal nem létezik...')
})

app.listen(5000,() => console.log(`server listening on port 5000...`))

