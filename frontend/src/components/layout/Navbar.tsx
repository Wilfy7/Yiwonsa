import React from "react";
import "./NavbarStyles.scss"
import { logUserOut, token } from '../../service/user.service'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const user = token


  const handleLogout = () => {
    logUserOut();
 }
    
  return (
    <nav className="globalstyles navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink 
        style={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            paddingRight: "1rem",
            color: "#fff",
            textDecoration: "none"
          }}
        to="/">Yiwonsa</NavLink>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
           <NavLink  className="nav-link pagestext" to="/"></NavLink>
         </li>
         <li className="nav-item">
           <NavLink  className="nav-link pagestext" to="/restaurants">Restaurants</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link pagestext" to="/products">Products</NavLink>
         </li>
         <li className="nav-item">
          <NavLink className="nav-link pagestext" to="/profile">Profile</NavLink>
         </li>
         
       
          <li className="nav-item dropdown">
            <NavLink 
            className="nav-link dropdown-toggle pagestext" 
            to="#" 
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false">
             More
            </NavLink>
            <ul className="dropdown-menu">
            <li className="nav-item">
          <NavLink className="nav-link pagestext" to="/payment"
              style={{cursor: "pointer", color:"black"}}>
                Payment
          </NavLink>
         </li>

              { //If not a user show me login
            !user &&(
              <NavLink className="nav-link pagestext"  to="/login">
                Login
              </NavLink>
            )} 

            { //If user Display logout
            user && (
              <span  onClick={handleLogout} style={{cursor: "pointer", marginLeft:"10px"}}>
                 Logout
              </span>
            )}
              <li>
              {
          //If not a user show me register
          !user && (
               <NavLink to="/registration" className="nav-link pagestext">
                
               </NavLink>
             )
            }
              </li>
            </ul>
          </li>
        </ul>
           
      </div>
      </div>
    </nav>
  )
}

export default Navbar;
