import React, { useEffect, useState, createContext } from 'react'

const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [ playlists, setPlaylists ] = useState([]);
  const [ token, setToken ] = useState(null);
  useEffect(() => {
    fetch('/api/game', {credentials: 'include'})
    .then((response) => response.json())
    .then((data) => {
      setToken(data.accessToken);
      setPlaylists(data.items);
    });
  },[])
  return (<StateContext.Provider value={{ playlists, token }}>{ children }</StateContext.Provider>)
}

export { StateContext, StateProvider }