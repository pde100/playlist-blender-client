import React from 'react'
import "./styles.css";



const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=39d8915cc7ae447fab2f74010195ab7f&response_type=code&redirect_uri=http://localhost:3000/&scope=user-library-modify%20user-library-read%20user-read-email%20user-top-read%20user-read-recently-played%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public";


export default function Login() {
    return <div className = "centered-container"  >

        <div className="instructions title"> 
            Playlist Blender
        </div>
        <div className="instructions"> 
            Instructions: 
            <br></br>
            After logging in, please enter your group's custom code to join their session. If you are the first in your group, create your own custom code, enter it, and share it with the rest of your group. After all members have joined, click the create playlist button and listen to the playlist from Spotify. If you wish to add more members after creating a playlist, please have everyone rejoin again. Please send questions and feedback to pramitde@utexas.edu.
            <br></br>
            Happy listening!
        </div>
        <br></br>
        <a className="btn login-btn"  href={AUTH_URL}>Login with Spotify</a>
    </div>
}
