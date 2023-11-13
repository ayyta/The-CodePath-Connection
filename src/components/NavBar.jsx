import { Link } from "react-router-dom";


const NavBar = (props) => {
  const { showPopUp } = props
  return (
    <>
      <p className="nav-title">The CodePath Connection</p>
      <div className="input-container">
        <img className="input-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"></img>
        <input className="search-bar" id="search-input" placeholder="Search Posts"></input>
      </div>

      <Link to='/' className="nav-home">Home</Link>
      <p onClick={ ()=> showPopUp(true) }>Create a New Post</p>
    </>
  )
}

export default NavBar;