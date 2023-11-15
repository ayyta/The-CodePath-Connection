import { Link } from "react-router-dom";
import { useState } from 'react'

const NavBar = (props) => {
  const { showPopUp, setSearchTerm } = props

  return (
    <>
      <Link to='/'className="nav-title">The CodePath Connection</Link>
      <div className="input-container">
        <img className="input-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"></img>
        <input className="search-bar" id="search-input" placeholder="Search Posts" onChange={(e) => setSearchTerm(e.target.value)}></input>
      </div>

      <div className="nav-options">
        <Link to='/' className="nav-home">Home</Link>
        <p className="nav-create" onClick={ ()=> showPopUp(true) }>Create a New Post</p>
      </div>
    </>
  )
}

export default NavBar;