import React from 'react';
import './card2.css'

function Card(props) {
    return (
        <div className = "Card">
            <div className = "Card__img">
                <img src={props.pokemon.sprites.front_default} alt="hi"></img>
            </div>
            <div classname="Card__name">
                {props.pokemon.name}
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight</p>
                    <p>{props.pokemon.weight}</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Height</p>
                    <p>{props.pokemon.height}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;