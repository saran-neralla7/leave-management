import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LeavesProvider } from './context/LeavesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeavesProvider>
        <App />
      </LeavesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
