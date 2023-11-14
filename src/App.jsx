import { useState, useEffect } from 'react'
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import './App.css'
import './Create.css'

const supabaseURL = "https://ieqsymoycrshpinlvric.supabase.co"
const supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllcXN5bW95Y3JzaHBpbmx2cmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3ODE3ODQsImV4cCI6MjAxNTM1Nzc4NH0.vC--K-ctEydWuP4ZSZBghMpG9eJac1se6tXGC1sjBXM"

const supabase = createClient(supabaseURL, supabaseAPIKey)

import NavBar from './components/NavBar'
import Home from './routes/Home'
import Create from './routes/Create'




function App() {
  const [showCreatePopUp, setShowCreatePopUp] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const createPost = (client, postInputs) => {
    async function createNewPost () {
      const { inputTitle, inputDescription, inputImage } = postInputs
      const { data, error } = await client
      .from('posts')
      .insert([{ title: inputTitle, description: inputDescription, photos: inputImage }])
      .select()
  
      if (error) {
        console.warn(error)
      } else {
        alert('Successfully Created New Post')
        setShowCreatePopUp(false)
      }
    }
    createNewPost();
  }

  return (
    <>
    <BrowserRouter>
      <main>
        <div className="nav-container">
          {<NavBar showPopUp={setShowCreatePopUp} setSearchTerm={setSearchTerm}/>}
        </div>

        <div className="post-container">
          {<Home client={supabase} showPopUp={showCreatePopUp} searchTerm={searchTerm}/>}

        </div>

        { showCreatePopUp && (
          <div className='create-pop-up'>
            <button className='create-pop-up-button' onClick={() => setShowCreatePopUp(false)}>Close</button>
            <Create client={supabase} showPopUp={setShowCreatePopUp} exec={createPost} title='Create a New Post'/>
          </div>
        )}
      </main>
    </BrowserRouter>
    </>
  )
}

// make something to hold the things
export default App
