import React, {useRef, useState} from 'react'
import {useAuth} from './contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import firebase from 'firebase'
import './styles/login.css'
import logo from '../PokeLogo.png'


export default function Signup(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value
        try {
            setError('')
            setLoading(true);

           await signup(email,passwordRef.current.value)
           history.push('/')
        } catch {
            setError('Failed to create an Account')
            setLoading(false)
            return;
        }
        const users = firebase.firestore().collection("Users")
        const pokemon = []
        users.doc(email).set({pokemon: pokemon, candies: 10}).catch((err)=> console.log(err))
        setLoading(false);
    }

    return (
        <>
        <div className="logo">
            <img src={logo} width='500px'/>
        </div>
        <div className='login'>
        <form className='form' onSubmit={handleSubmit}>
        <h2 className="SignUp">Sign Up</h2>
        {error}
        <div className='email'>

        <label htmlFor="email">Email: </label>
        <br/>
        <input type="text" id="email" name="email" ref={emailRef} ></input>
        </div>
        <div className='password'>

        <label htmlFor="password">Password: </label>
        <br/>
        <input type="text" id="password" ref={passwordRef} name="password" ></input>
        </div>
        <input type="submit"  disabled={loading} className="buttonSmall"></input>
        </form>
       
        <div className="yeet">
        Already have an account? <Link to="/login">Login</Link>
        </div>
        <br></br>
        <br></br>

        <p>
        Thanks to the <a href="https://pokeapi.co/">PokeAPI</a>, <a href="https://rapidapi.com/convertisseur.mp3.video/api/download-video-youtube1">Download Youtube Video API</a>, Firebase, 
        <a href="https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw">WebDevSimplified</a> (for some react tutorials), GitHub Pages, and React for making this website possible!
        </p>
        </div>
        </>
        
    )
}
