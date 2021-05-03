import React, { useState, useEffect} from 'react'
import { useAuth } from './components/contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import firebase from "firebase"
import Cardmin from "./components/Card/Cardmin"
import axios from 'axios'
import './components/Card/card2.css'

export default function Profile() {
    //const profile = useContext(Login)
    const { currentUser, logout } = useAuth()
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([])
    const [pokemonBody, setPokemonBody] = useState([])
    const [candies, setCandies] = useState(0)
    const [pokemonIndex, setIndex] = useState(0)
    const history = useHistory()

    async function handleLogout() {
        try {
            await logout();
            history.push('/login')
        } catch {

        }
    }    

    useEffect(()=> {
       const getPokemonTest = async () => {
        const poke = await firebase.firestore().collection("Users").doc(currentUser.email).get()
        let candy = await firebase.firestore().collection("Users").doc(currentUser.email).get()
        candy = candy.data().candies;
        setCandies(candy)
        let pokemonArray=[]
        let arraylength = 24
        if(poke.data().pokemon.length < 24) arraylength=poke.data().pokemon.length
        console.log(poke.data())

        for(let i =0; i< arraylength; i++) {
        const request = await axios.get('https://pokeapi.co/api/v2/pokemon/'+poke.data().pokemon[i].randomPoke)
            pokemonArray.push(<Cardmin candies={candy} id={i} key={i} enemy={Math.round(Math.random() * 898)} level={poke.data().pokemon[i].level} pokemon={request.data}/>)
        }
        setPokemon(poke.data().pokemon)
        setPokemonBody(pokemonArray)
        setIndex(0)
        setLoading(false)
        
        }
        getPokemonTest()
        return
        
    },[]);

    if(loading) {
        return(
            <div className="parent">
            <h1 className="child"> LOADING </h1>
    <img className="child" src='https://media2.giphy.com/media/jQbinPsqqfg8GFxbQw/giphy.gif'></img>
    </div>)
    }
    const prevPokemon = async () => {
        if(pokemon.length > 24 && pokemonIndex > 0) {
            let pokemonArray = []
            for(let i = 0 + (pokemonIndex-1) * 24; i< 0 + pokemonIndex * 24; i++) {
            const request = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon[i].randomPoke)
                pokemonArray.push(<Cardmin candies={candies} id={i} key={i} level={pokemon[i].level} enemy={Math.round(Math.random() * 898)} pokemon={request.data}/>)
            }
            setIndex((prev) => prev-1)

            setPokemonBody(pokemonArray)
        }
    }

    const nextPokemon = async () => {
        if(pokemon.length > 24 && pokemonIndex < Math.round(pokemon.length / 24)) {
            let arrayLength = (pokemonIndex+2) * 24;
            if(pokemon.length < (pokemonIndex+2) * 24) arrayLength = pokemon.length - (pokemonIndex*24)
            let pokemonArray = []
            for(let i = 0 + (pokemonIndex+1) * 24; i< arrayLength; i++) {
            const request = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon[i].randomPoke)
                pokemonArray.push(<Cardmin candies={candies} id={i} key={i} enemy={Math.round(Math.random() * 898)} level={pokemon[i].level} pokemon={request.data}/>)
            }
            setIndex(prev => prev+1)
            setPokemonBody(pokemonArray)

        }
    }
    const handleOnChange = async ()=> {
        //if(!button) return;
        if(candies < 10) return;
        let randomPoke = Math.round(Math.random()*897)+1
        let level = Math.round(Math.random()*10)+1
        await firebase.firestore().collection("Users").doc(currentUser.email).update({pokemon: firebase.firestore.FieldValue.arrayUnion({
            randomPoke,
            level,
        }),
        })
        setCandies(prevCount => prevCount - 10)
        await firebase.firestore().collection("Users").doc(currentUser.email).update({candies: candies - 10 }).catch((err) => console.log(err))


        const getPokemonTest = async () => {
         const poke = await firebase.firestore().collection("Users").doc(currentUser.email).get()
         let candy = await firebase.firestore().collection("Users").doc(currentUser.email).get()
         candy = candy.data().candies;
         setCandies(candy)
         console.log(candy)
         console.log(poke)
         let pokemonArray=[]
         let arrayLength = poke.data().pokemon.length;
         if(poke.data().pokemon.length > 30) arrayLength=30;
         for(let i =0; i< arrayLength; i++) {
         const request = await axios.get('https://pokeapi.co/api/v2/pokemon/'+poke.data().pokemon[i].randomPoke)
             pokemonArray.push(<Cardmin candies={candy} id={i} key={i} enemy={Math.round(Math.random() * 898)} level={poke.data().pokemon[i].level} pokemon={request.data}/>)
         }
         setPokemon(poke.data().pokemon)
         setPokemonBody(pokemonArray)
         
         setLoading(false)
         
         }
         await getPokemonTest()
    }
  
    return (
        <div>
            <div className="profile">
            <div className="flex2">
            <h1>My Profile</h1>
                <div className="float3">
                <button className="logOut" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className="flex" >
            <p> Email:  {currentUser.email} </p>
            <div className="float3">
            <button className="buttonP" onClick={handleOnChange}>Get Random Pokemon for 10 candies!</button>
            </div>
            </div>
            <br/>
            <div className="flex">
               Candies: {candies}
            </div>
            
            <br/>
            <div>
                Pokemon:
                <button className="page2" onClick={prevPokemon}>Previous Page</button>
                <button className="page3" onClick={nextPokemon}>Next Page</button>
            </div>
            <br/>
            </div>
            <div className="pokemonCards">
            {pokemonBody}
            </div>
        </div>
    )
}
