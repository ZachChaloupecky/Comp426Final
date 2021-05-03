import React, {useRef, useState} from 'react'
import {useAuth} from './contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import './styles/login.css'
import logo from '../PokeLogo.png'

export default function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true);
           await login(emailRef.current.value,passwordRef.current.value)
           history.push('/')
        } catch {
            setError('Failed to log in')
        }
        setLoading(false);
    }

    return (
        <>
        <div className="logo">
            <img src={logo} width='500px'/>
        </div>
        <div className='login'>
        <form className='form' onSubmit={handleSubmit}>
        <h2 className="SignUp">Log In</h2>
        {error}
        <div className='email'>
        <label htmlFor="email">Email: </label>
        <br/>
        <input type="text" id="email" name="email" ref={emailRef} ></input>
        <br></br>
        </div>
        <div className='password'>
        <label htmlFor="password">Password: </label>
        <br/>
        <input type="text" id="password" ref={passwordRef} name="password" ></input>
        </div>
        <input type="submit" disabled={loading} className="buttonSmall" ></input>

        </form>
        <div className="yeet">
        Don't have an Account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
        </>
        
    )
}
