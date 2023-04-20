import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' 
import { BrowserRouter } from 'react-router-dom'
import { StateProvider } from './context/statecontext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
