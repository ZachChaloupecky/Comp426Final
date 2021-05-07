import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Longcard from './Card/Longcard';
import './styles/gameview.css'
import {useHistory} from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'
import firebase from "firebase"


function Gameview(props) {
    const [isLoading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({})
    const [pokemon2, setPokemon2] = useState({});
    const { currentUser} = useAuth()
    const [enemyHP, setEnemyHP] = useState(props.health2);
    const [enemyHPMax, setEnemyHPMax] = useState(0)
    const [myHP, setMyHP] = useState(props.location.state.level * 10); 
    const [text, setText] = useState('')
    const [gameOver, setgameOver] = useState(false)
    const history = useHistory()
    const [enemyLevel, setEnemyLevel]=useState(0)
    const [multiplier, setMultiplier] = useState(10)
    const [candies, setCandies] = useState(0);

    
    function typeCheck(enemyType) {
        let myType = props.location.state.pokemon.types[0].type.name

        if(enemyType==="normal") enemyType = 0;
        if(enemyType==="fire") enemyType = 1;
        if(enemyType==="water") enemyType = 2;
        if(enemyType==="electric") enemyType = 3;
        if(enemyType==="grass") enemyType = 4;
        if(enemyType==="ice") enemyType = 5;
        if(enemyType==="fighting") enemyType = 6;
        if(enemyType==="poison") enemyType = 7;
        if(enemyType==="ground") enemyType = 8;
        if(enemyType==="flying") enemyType = 9;
        if(enemyType==="psychic") enemyType = 10;
        if(enemyType==="bug") enemyType = 11;
        if(enemyType==="rock") enemyType = 12;
        if(enemyType==="ghost") enemyType = 13;
        if(enemyType==="dragon") enemyType = 14;
        if(enemyType==="dark") enemyType = 15;
        if(enemyType==="steel") enemyType = 16;

        const TYPE_CHART = {
            normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .75, 0, 1, 1, .75],
            fire: [1, .75, .75, 1, 2, 2, 1, 1, 1, 1, 1, 2, .75, 1, .75, 1, 2],
            water: [1, 2, .75, 1, .75, 1, 1, 1, 2, 1, 1, 1, 2, 1, .75, 1, 1],
            electric: [1, 1, 2, .75, .75, 1, 1, 1, 0, 2, 1, 1, 1, 1, .75, 1, 1],
            grass: [1, .75, 2, 1, .75, 1, 1, .75, 2, .75, 1, .75, 2, 1, .75, 1, .75],
            ice: [1, .75, .75, 1, 2, .75, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, .75],
            fighting: [2, 1, 1, 1, 1, 2, 1, .75, 1, .75, .75, .75, 2, 0, 1, 2, 2],
            poison: [1, 1, 1, 1, 2, 1, 1, .75, .75, 1, 1, 1, .75, .75, 1, 1, 0],
            ground: [1, 2, 1, 2, .75, 1, 1, 2, 1, 0, 1, .75, 2, 1, 1, 1, 2],
            flying: [1, 1, 1, .75, 2, 1, 2, 1, 1, 1, 1, 2, .75, 1, 1, 1, .75],
            psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, .75, 1, 1, 1, 1, 0, .75],
            bug: [1, .75, 1, 1, 2, 1, .75, .75, 1, .75, 2, 1, 1, .75, 1, 2, .75],
            rock: [1, 2, 1, 1, 1, 2, .75, 1, .75, 2, 1, 2, 1, 1, 1, 1, .75],
            ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, .75, .75],
            dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, .75],
            dark: [1, 1, 1, 1, 1, 1, .75, 1, 1, 1, 2, 1, 1, 2, 1, .75, .75],
            steel: [1, .75, .75, .75, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, .75]
      };
      let a = TYPE_CHART[myType][enemyType]
      if(a==NaN) a = 1;
      return a;
    }

    function flee() {
        if(gameOver) return;
        if(Math.random() < .7) {
            let candy = candies;
            setText(pokemon.name +" sucessfully flees the battle!")
            setgameOver(true);
            firebase.firestore().collection("Users").doc(currentUser.email)
            .get().then((doc) => {
  
              // Assign array to local javascript variable
              var objects = doc.data().pokemon
        
              // Assing desired element of object to local javascript variable 
              var objectToupdate = objects[props.location.state.id]
  
              // Update field of the element assigned to local javascript variable
              objectToupdate.level = props.location.state.level
              // reassign object to local array variable
              objects[props.location.state.id] = objectToupdate 
            
            firebase.firestore().collection("Users").doc(currentUser.email)
                .update({
                  pokemon: objects
                })
            })
            if(candy < 1) {
                candy = 0
            } else {
                candy = candy -1;
            }
            firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candy}).catch((err) => console.log(err))

            setTimeout(function() {
                history.push('/')
            },2000)
            return;
        }
        setText(pokemon.name +" fails flees the battle!")

        let modify = 1;
        if(Math.round(Math.random())===0) {modify = -1;}

        modify = modify* Math.round(Math.random()*props.location.state.level)/2
        let count2 = Math.round(Math.random() * (enemyLevel + props.location.state.level+ modify) )
        setMyHP(prev => prev - count2)
        if(myHP-count2 <= 0) {
            setMyHP(0)
            let candy = candies;
            setText(pokemon.name + " has fainted!")
            let level = props.location.state.level-1
            if(level===0) level = 1
            firebase.firestore().collection("Users").doc(currentUser.email)
            .get().then((doc) => {
  
              // Assign array to local javascript variable
              var objects = doc.data().pokemon
        
              // Assing desired element of object to local javascript variable 
              var objectToupdate = objects[props.location.state.id]
  
              // Update field of the element assigned to local javascript variable
              objectToupdate.level = level  
              // reassign object to local array variable
              objects[props.location.state.id] = objectToupdate 

            firebase.firestore().collection("Users").doc(currentUser.email)
                .update({
                  pokemon: objects
                })
            })
            if(candy < 5) {
                candy = 0
            } else {
               candy = candy -5;
            }
            firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candy}).catch((err) => console.log(err))

            setTimeout(function() {
                history.push('/')
            },2000)
            return;
        }
    }


    function decrementCount () {
        if(gameOver) return;
        if(enemyHP <= 0 ){
            setEnemyHP(0)
            console.log("You Win!")
            return;
        } 
        if(myHP <= 0) {
            setMyHP(0)
            console.log("You Lose")
            return;
        }
        let modify = 1;
        if(Math.round(Math.random())===0) {modify = -1;}

        modify = modify* Math.round(Math.random()*props.location.state.level)/6
        let count1 = Math.round(props.location.state.level * 1.3 + modify)
        let enemymod = (Math.random()+.1);
        if(enemymod < .7) enemymod = .7;
        if(props.location.state.level < 10) modify = -1;
        let count2 = Math.round(enemymod * (enemyLevel * 1.2) + modify)
        setEnemyHP(prevCount => prevCount-count1)
        if(count2< 0) count2 = 0;
        check(count1, count2);
    }

    function decrementCountType () {
        if(enemyHP <= 0 ){
            setEnemyHP(0)
            console.log("You Win!")
            return;
        } 
        if(myHP <= 0) {
            setMyHP(0)
            console.log("You Lose")
            return;
        }
        let modify = 1;
        if(Math.round(Math.random())===0) {modify = -1;}

        modify = modify* Math.round(Math.random()*props.location.state.level)/6
        let count1 = Math.round(props.location.state.level * multiplier + modify)
        let enemymod = Math.round((Math.random()+.3));
        if(enemymod < .7) enemymod = .7;
        let count2 = Math.round(enemymod * (enemyLevel * 1.2) + modify) 
        setEnemyHP(prevCount => prevCount-count1)
        
        if(count2< 0) count2 = 0;
        check(count1, count2);
        
    }

    async function catchPoke () {
        if(gameOver) return;
        if(candies < 10) {
            setText("Not enough candies!")
            return;
        }
        let candy = candies;
        if(enemyHP < enemyHPMax * .3) {
            if(Math.random() < .3) {
                setText("Successfully caught " + pokemon2.name + "!")
                let randomPoke = pokemon2.id
                let level = enemyLevel
                setgameOver(true);
                await firebase.firestore().collection("Users").doc(currentUser.email).update({pokemon: firebase.firestore.FieldValue.arrayUnion({
                    randomPoke,
                    level,
                }),
                })
                await firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candy - 10 }).catch((err) => console.log(err))
                setTimeout(function() {
                    history.push('/')
                },2000)
                return;
            }
        }
        setText("Failed to catch " + pokemon2.name + "!")
        let count2 = Math.round((Math.random()+.2)* (enemyLevel)) 
        if(count2< 0) count2 = 0;
        setMyHP(prev => prev - count2)
        if(myHP-count2 <= 0) {
            let candy = candies;
            setMyHP(0)
            console.log("You Lose")
            setText(pokemon.name + " has fainted!")
            let level = props.location.state.level-1
            if(level===0) level = 1
            firebase.firestore().collection("Users").doc(currentUser.email)
            .get().then((doc) => {
  
              // Assign array to local javascript variable
              var objects = doc.data().pokemon
        
              // Assing desired element of object to local javascript variable 
              var objectToupdate = objects[props.location.state.id]
  
              // Update field of the element assigned to local javascript variable
              objectToupdate.level = level  
              // reassign object to local array variable
              objects[props.location.state.id] = objectToupdate 

            firebase.firestore().collection("Users").doc(currentUser.email)
                .update({
                  pokemon: objects
                })
            })
            if(candy < 5) {
                candy = 0;
            } else {
               candy = candy-5;
            }
            firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candy}).catch((err) => console.log(err))

            setTimeout(function() {
                history.push('/')
            },2000)
            return;
        }

    }

    async function check(count1, count2) {
        let textArray = [
            pokemon.name + " attacks for " + count1 + "  damage!  " + pokemon2.name + " retaliates for " + count2 + " damage!", 
            pokemon.name + " hits " + pokemon2.name + " for " + count1 + "  damage!  " + pokemon2.name + " retaliates for " + count2 + " damage!",
            pokemon.name + " hits " + pokemon2.name + " for " + count1 + "  damage!  " + pokemon2.name + " hits "+ pokemon.name +" for " + count2 + " damage!",
            pokemon.name + " strikes " + pokemon2.name + " for " + count1 + "  damage!  " + pokemon2.name + " returns for " + count2 + " damage!",
            pokemon.name + " hits " + pokemon2.name + " for " + count1 + "  damage!  " + pokemon2.name + " strikes "+ pokemon.name +" for " + count2 + " damage!"
        ]
        let text = textArray[Math.round(Math.random()*4)]
        if(enemyHP-count1 <= 0 ){
            setEnemyHP(0)
            setText(pokemon.name + " wins")
            let level = props.location.state.level+1
            firebase.firestore().collection("Users").doc(currentUser.email)
            .get().then((doc) => {
        
              // Assign array to local javascript variable
              var objects = doc.data().pokemon
        
              // Assing desired element of object to local javascript variable 
              var objectToupdate = objects[props.location.state.id]
  
              // Update field of the element assigned to local javascript variable
              objectToupdate.level = level  
              // reassign object to local array variable
              objects[props.location.state.id] = objectToupdate 

            firebase.firestore().collection("Users").doc(currentUser.email)
                .update({
                  pokemon: objects
                })
            })

            firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candies+3}).catch((err) => console.log(err))
        
            setTimeout(function() {
                history.push('/')
            },2000)
            return
        } 
        setMyHP(prev => prev - count2)
        if(myHP-count2 <= 0) {
            let candy = candies;
            setMyHP(0)
            console.log("You Lose")
            setText(pokemon.name + " has fainted!")
            let level = props.location.state.level-1
            if(level===0) level = 1
            firebase.firestore().collection("Users").doc(currentUser.email)
            .get().then((doc) => {
  
              // Assign array to local javascript variable
              var objects = doc.data().pokemon
        
              // Assing desired element of object to local javascript variable 
              var objectToupdate = objects[props.location.state.id]
  
              // Update field of the element assigned to local javascript variable
              objectToupdate.level = level  
              // reassign object to local array variable
              objects[props.location.state.id] = objectToupdate 

            firebase.firestore().collection("Users").doc(currentUser.email)
                .update({
                  pokemon: objects
                })
            })
            if(candy < 5) {
                candy = 0;
            } else {
                candy=candy-5;
            }
            firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candy}).catch((err) => console.log(err))

            setTimeout(function() {
                history.push('/')
            },2000)
            return;
        }
        setText(text)
    }

    useEffect(() => {
        setPokemon(props.location.state.pokemon);
        const setUp = async function() {
        const request2 = await axios('https://pokeapi.co/api/v2/pokemon/' + props.location.state.enemy)
        setMultiplier(typeCheck(request2.data.types[0].type.name))

        setPokemon2(request2.data);

        setEnemyHP(myHP + Math.round((Math.random() * props.location.state.level/15)))
        setEnemyHPMax(myHP + Math.round((Math.random()*props.location.state.level/15)))
        setMyHP(props.location.state.level * 10)
        setEnemyLevel(props.location.state.level + Math.round(Math.random() * 2))
        let candy = await firebase.firestore().collection("Users").doc(currentUser.email).get()
         candy = candy.data().candies;
         setCandies(candy)
        setLoading(false);
    }
        setUp()
        
    }, [])

 
    if(isLoading) {
        return(
            <div className="parent">
            <h1 className="child"> LOADING </h1>
    <img className="child" src='https://media2.giphy.com/media/jQbinPsqqfg8GFxbQw/giphy.gif'></img>
    </div>)
    }
    
    return (
        <div>
            <div className="std">
            <Longcard key={1} pokemon={pokemon} level={props.location.state.level} pokemon2={pokemon2} level2={enemyLevel} hp={myHP} hp2={enemyHP}/>
            <div className="buttonContainer">
                <div className="attack">
                    {text} 
                </div>
                <br/>
                <div className = "center">
                    <button className="button" onClick={decrementCount}>Attack!</button>
                    <button className="button" onClick={decrementCountType}>Type Attack!</button>
                </div>
                <br/>
                <div className = "center">
                    <button className="button" onClick={flee}>Flee</button>
                    <button className="button" onClick={catchPoke}>Catch</button>
                </div>
            </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default Gameview