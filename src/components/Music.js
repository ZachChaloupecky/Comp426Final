import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '../components/Card/card2.css'

function Music() {
    const [music, setMusic] = useState('')

    useEffect(() => {
      const getPokemonTest = async () => {
        axios.get("/music").then(res => {
          console.log(res)
          setMusic(res.data.vidInfo[1].dloadUrl)
        })
      }
      
     getPokemonTest()

    },[])

    //if(loading) return(<div></div>);

    return (
        <>
        <div className="musicControl">
          Music:  
        <br></br>
        <audio preload="auto"  controls autoPlay loop  src={music} type="audio/mpeg">
          <embed src={music}/>
        </audio> 
        </div>
        </>
    )
}

export default Music;

/* 
<Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Profile}></PrivateRoute>
          <Route path="/signup" component={Signup}></Route>
          <Route path ="/login" component={Login}></Route>
          <PrivateRoute exact path="/game" component={Gameview}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
*/