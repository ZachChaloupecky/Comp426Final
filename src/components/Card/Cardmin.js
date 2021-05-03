import React from 'react';
import './card2.css'
import { Link } from 'react-router-dom'

function Cardmin(props) {
    return (
        <div className="Card1">
           <div >
                <img className = "Card__img1"  alt="hi" src={props.pokemon.sprites.front_default}></img>
            </div>
            <div className="Card__name1">
                {props.pokemon.name}
            </div>
            <div className="Card__types1">
                Level: {props.level}
            </div>
            <Link to={{
                pathname: "/game",
                state: {
                    pokemon: props.pokemon,
                    level: props.level,
                    candy: props.candies,
                    id: props.id,
                    enemy: props.enemy,
                }
                }}>
            <button className='center' pokeid={props.pokemon.id} level={props.level}>Battle!</button>
            </Link>
        </div>
    )
}


export default Cardmin;