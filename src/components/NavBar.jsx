import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <>
      <p className="nav-title">PetBook</p>
      <div className="input-container">
        <img className="input-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"></img>
        <input className="search-bar" id="search-input" placeholder="Search Posts"></input>
      </div>
    </>
  )
}

export default NavBar;