import React from "react";
import { tokenData } from "../../service/user.service";
import "./ProfileStyles.scss";
import { Link } from "react-router-dom";

const Profile = () => {

    const userData = tokenData;
    
 
    return (
      <div className="container card" style={{marginTop: "10rem"}}>
       <div>
          <h2 className="textHeader">Profile</h2>
          <div className="profile"> 
           <img className="picture"
             src={userData.user.imageurl}
             alt={userData.user.name}
           />
          </div>
       </div>
        <p>Name: {userData.user.fullName}</p>
        <p>Email: {userData.user.email}</p>
        <Link to="/update-profile">Edit</Link>

      </div>
    )
  }
  
  export default Profile;
