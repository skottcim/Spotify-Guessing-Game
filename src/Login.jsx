import * as React from 'react';
import Button from '@mui/material/Button';
import './App.css'
import Link from '@mui/material/Link';

const urlVar = 'https://accounts.spotify.com/authorize?client_id=cea0ace948294a0dbf34d95f33081dbb&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstart&scope=user-top-read'

const Login = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Spotifind!</h1>
      <p style={{ textAlign: "center"}}>A random song is played from your playlists. Can you guess the artist correctly?</p>
      <Link href={urlVar}>
        <div className='Button'>
          <Button variant="contained" 
          sx={{background: '#6a8f8b',
              boxShadow: 2,
              ":hover": {
              bgcolor: "#4b6260",
            }}}>Login to Spotify to play
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default Login
