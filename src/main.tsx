import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// VITE_ROUTER=memory builds a copy that runs inside an embedded frame without touching the URL (e.g. claude.ai artifact).
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : HashRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
