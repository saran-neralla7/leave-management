import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LeavesProvider } from './context/LeavesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LeavesProvider>
          <App />
        </LeavesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
