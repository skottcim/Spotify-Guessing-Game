import * as React from 'react'
import './App.css'
import Login from './Login'
import Game from './Game'
import { Routes, Route } from 'react-router-dom'
import Winner from './Winner.jsx'
import Loser from './Loser.jsx'

function App() {
  return (

    <div>
      <Routes>
        <Route path='/' element={<Login/ >}></Route>
        <Route exact path='/game' element={<Game />}></Route>
        <Route exact path='/game/winner' element={<Winner />}></Route>
        <Route exact path='/game/loser' element={<Loser />}></Route>
      </Routes>
    </div>
  )
}

export default App