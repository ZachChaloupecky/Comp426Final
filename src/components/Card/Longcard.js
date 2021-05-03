import React from 'react';
import './card.css'

function Longcard(props) {
    return (
        <div className="background">
            <div className="float">
            <div className="title">
                {props.pokemon.name}
                <div className = "hp">
                    hp: {props.hp}
                </div>
            </div>

           <div className="title2"> 
                <img className = "Card__img"  alt="hi" src={props.pokemon.sprites.back_default}></img>
            </div>
            
            <div className="Card__types">
                Level: {props.level}
            </div>
            </div>
        <div className="float2">
            
            <div className="Card__types">
                Level: {props.level2}
            </div>

           <div className="title2"> 
                <img className = "Card__img"  alt="hi" src={props.pokemon2.sprites.front_default}></img>
            </div>
            
            <div className="title">
                {props.pokemon2.name}
                <div className = "hp">
                    hp: {props.hp2}
                </div>
            </div>
        </div>
        </div>
    )
}


export default Longcard;