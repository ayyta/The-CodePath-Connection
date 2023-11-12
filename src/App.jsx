import { useState, useEffect } from 'react'
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabaseURL = "https://ieqsymoycrshpinlvric.supabase.co"
const supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllcXN5bW95Y3JzaHBpbmx2cmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3ODE3ODQsImV4cCI6MjAxNTM1Nzc4NH0.vC--K-ctEydWuP4ZSZBghMpG9eJac1se6tXGC1sjBXM"

const supabase = createClient(supabaseURL, supabaseAPIKey)

import NavBar from './components/NavBar'
import Home from './routes/Home'



function App() {

  return (
    <>
    <BrowserRouter>
      <main>
        <div className="nav-container">
          {<NavBar/>}
        </div>

        <div className="post-container">
          <Routes>
            <Route path='/' element={<Home/>}/>

          </Routes>
        </div>

      </main>
    </BrowserRouter>




    </>
  )
}

export default App
