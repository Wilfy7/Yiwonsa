import React, { useState } from "react";
import { tokenData } from "../../service/user.service";
import axios from "axios";
import "./Updateprofile.scss";
import { Link } from "react-router-dom";

export const baseUrl = process.env.REACT_APP_API

const Updateprofile = () => {

    const userData: any = tokenData;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email)
    if(image) {
      formData.append("image", image)
    }

   try {
   
    const res = await axios.put(`${baseUrl}/user/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Profile updated successfully:", res.data);
  } catch (error) {
    console.error("Error updating profile", error);
  } 
};
 
    return (
      <div className="container card" style={{marginTop: "10rem"}}>
       <div>
          <h2 className="textHeader">Profile</h2>
          <form onSubmit={handleSubmit}>
          <div className="input"> 
           <img className="picture"
             src={userData.user.imageurl}
             alt={userData.user.name}
           />
           <input type="file" accept="image/*" onChange={handleImageChange} 
           
           />
           

       </div>

       <div className="form-group">
         <label htmlFor="fullName">Name</label>
         <input 
           type="name"
           id="fullName"
           value={fullName}
           onChange={(e) => setFullName(e.target.value)}
         />
       </div>
       <div className="form-group">
        <div>
         <label htmlFor="email">Email</label>
         </div>
         <input 
           type="email"
           id="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)} 
          />
       </div>
         <button className="button__up" type="submit">Done</button>
        
        </form>
        </div>
      </div>
    );
  };

  export default Updateprofile;