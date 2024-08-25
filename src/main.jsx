import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import Router from './router'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
      <ThemeContextProvider>
        <Router/>
      </ThemeContextProvider> 
  </AuthContextProvider>

)
