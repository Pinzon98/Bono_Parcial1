import { useEffect, useState } from "react";
import {Card} from './Card'
import md5 from 'md5'

const PRIVATE_KEY = '1a79518320092f0adcca9822825517090a22e0fc'
const PUBLIC_KEY = 'e8e61be1a12aa4da11480c2bb40cbbff'
const TS = Date.now()
let hash = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`)

function PersonajesMarvel(){
    let [characters, setCharacters] = useState([]);

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("characters") === null){
                setCharacters("Loading...")
            } else {
                setCharacters(JSON.parse(localStorage.getItem("characters")))
            }
            
        } else {
            const URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hash}`
            fetch(URL).then(res=>res.json()).then(data=>{
                console.log(data)
                localStorage.setItem("characters", JSON.stringify(data.data.results))
                setCharacters(data.data.results);
            })
        }        
    },[]);

    return(
        <div className="row g-3">
            {characters.map( element => 
                <div key={element.id} className="col col-lg-3">
                    <Card key={element.id} id={element.id} image = {element.thumbnail.path+'/landscape_small.'+element.thumbnail.extension} name={element.name} description={element.description}></Card>
                </div>
            )}  
        </div>
    )
}   

export default PersonajesMarvel;