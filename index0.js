console.log("A node futtatja ezt a fajlt!")

const random=Math.floor(Math.random()*100)
console.log(`A véletleszám: ${random}`)

if(random>=50){
    console.log("Gratulálunk.")
}
else{
    console.log("Sajnáljuk.")
}
//rovidebben
random>=50 ? console.log("Gratulálok.") : console.log("Sajnálom.")

import { diakok } from "./data.js"
import { pers } from "./data.js"

console.log(`A diákok létszáma: ${diakok.length}`)

for(let obj of diakok){
    console.log(`
    Kedves ${obj.nev}!
    Ha több információra lenne szüksége, telefonon is megcsengethet.
    Tisztelettel: ${pers.nev}
    Telefonszám: ${pers.tel}`)
}