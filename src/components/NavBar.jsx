import React,{useEffect,useState} from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';


const Navbar = () => {
  const [user,setUser]=useState(null);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch("http://localhost:5000/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }
}, []);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={require("../images/Logo.png")} alt="Logo" width="90" height="90" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Recommendation</Link></li>
        <li><Link to="/consultants">Consultants</Link></li>
        <li><Link to="/blogs">Blog</Link></li>
      </ul>
      {user?(
        <div className="navbar-profile">
        <FaUser size={24} />{user.name}
      </div>
      ):(
        <Link to='/login'>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;