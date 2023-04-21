import React, { useEffect, useContext, useState } from 'react'
import initialDataGrab from './api.js'
import * as api from './api.js'
import { StateContext } from './context/statecontext.jsx'
import { Navigate } from 'react-router'
import { Howl, Howler } from 'howler'
import Button from '@mui/material/Button';
import './Game.css';
import Volume from './Volume.jsx'
import Winner from './Winner.jsx'
import Loser from './Loser.jsx'

const Game = () => {
  const buttonArtists = ['loading', 'loading', 'loading'];
  const { playlists, token } = useContext(StateContext);
  const [ songStatus, setSongStatus ] = useState({ play: false });
  const [ round, roundInfo ] = useState({
    artistName: 'artistName',
    previewURL: 'previewURL',
    buttonArtists: buttonArtists
  });

  //create a howl instance to play music
  const playSong = new Howl({
    src: [round.previewURL],
    html5: true,
    volume: 1
  })

  useEffect(() => {
    if(playlists.length) {

      //create a random number to grab a playlist and also grab the link of the playlist
      const playlistID = (Math.floor((Math.random() * 100)) % playlists.length);
      const link = playlists[playlistID].tracks.href

      fetch(link, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const playlist = JSON.parse(JSON.stringify(data.items));
        const artists = new Set();

        //populate a set with all artists from the playlist
        playlist.forEach((el) => {
          if (!artists.has(el.track.artists[0].name)) artists.add(el.track.artists[0].name);
        })
        
        //choose a random song from the playlist and grab the artist name and preview link.
        //also remove the artist of the song from the set to avoid duplicates in the buttons
        const songID = (Math.floor((Math.random() * 100)) % playlist.length);
        const artistName = playlist[songID].track.artists[0].name;
        const previewURL = playlist[songID].track.preview_url;
        artists.delete(artistName);

        //convert the set into an array so we can grab from it randomly
        const artistArray = [...artists];

        //grab two random artists plus the actual artist and place them into an array
        buttonArtists[0] = artistArray.splice(((Math.floor((Math.random() * 100)) % artistArray.length)), 1)[0];
        buttonArtists[1] = artistArray.splice(((Math.floor((Math.random() * 100)) % artistArray.length)), 1)[0];
        buttonArtists[2] = artistArray.splice(((Math.floor((Math.random() * 100)) % artistArray.length)), 1)[0];
        buttonArtists[3] = artistArray.splice(((Math.floor((Math.random() * 100)) % artistArray.length)), 1)[0];
        buttonArtists[4] = artistName;
        
        //shuffle the array
        for (var i = buttonArtists.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = buttonArtists[i];
          buttonArtists[i] = buttonArtists[j];
          buttonArtists[j] = temp;
        }

        //add to state
        roundInfo({
          artistName: artistName,
          previewURL: previewURL,
          buttonArtists: buttonArtists
        });
      });
    }

  }, [playlists])
  
  //handles the guess feature when user clicks a button to guess the artist
  const guessHandler = guess => {
    if (guess === round.artistName) {
      console.log("CORRECT!");
      location.replace('/game/winner');
    }
    else {
      console.log("WRONG!");
      location.replace('/game/loser');
    }
  }

  //handles the listen feature when user clicks button to listen to the song
  const listenHandler = () => {
    console.log('sdafsdafasfas ', playSong.playing())
    if (songStatus.play === false) {
      console.log('entering is false block');
      playSong.play();
      setSongStatus({ play: true });
    }
    else {
      console.log('entering else block');
      playSong.pause();
      setSongStatus({ play: false });
    }
    return;
  }

  return (
    <div>
      <div>
        <Button variant="contained" 
          sx={{ m: 1.5,
            boxShadow: 1,
            fontSize: 20, 
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={listenHandler}>Play</Button>
          <Volume />
      </div>
      <div>
        <Button variant="contained" 
          sx={{ m: 1.5, 
            boxShadow: 1,
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={() => guessHandler(round.buttonArtists[0])}>{round.buttonArtists[0]}</Button>
        <Button variant="contained" 
          sx={{ m: 1.5, 
            boxShadow: 1,
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={() => guessHandler(round.buttonArtists[1])}>{round.buttonArtists[1]}</Button>
        <Button variant="contained" 
          sx={{ m: 1.5, 
            boxShadow: 1,
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={() => guessHandler(round.buttonArtists[2])}>{round.buttonArtists[2]}</Button>
        <Button variant="contained" 
          sx={{ m: 1.5, 
            boxShadow: 1,
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={() => guessHandler(round.buttonArtists[3])}>{round.buttonArtists[3]}</Button>
        <Button variant="contained" 
          sx={{ m: 1.5, 
            boxShadow: 1,
            background: '#6a8f8b',
            ":hover": {
              bgcolor: "#4b6260",
            }}}
          className='guessButtons'
          onClick={() => guessHandler(round.buttonArtists[4])}>{round.buttonArtists[4]}</Button>
      </div>
    </div>
  )
}

export default Game