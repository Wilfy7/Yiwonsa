import React, { useState } from "react";
import { registerUser } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import "./RegistrationStyles.scss";

const Register = () => {
    const [input, setInput] = useState({

        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        post: ""
        
    });

    //Navigate through the register
    const navigate = useNavigate();


    //Handle change
    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setInput({
            ...input, 
            [name]:value
    });
};

    const handleSubmit = (e: any) => {
        e.preventDefault()
    
        registerUser (input);
        navigate("/login");
    };

  return (
    <div className="resgistration__container">
       <div className="resgistration__content ">
    <h2>Registration</h2>
    <form onSubmit={handleSubmit}>
     <div className="mb-3">
        <label 
          htmlFor="exampleInputfullName1" 
          className="form-label">
            Full Name
        </label>
        <input 
          type="text" 
          className="form-control" 
          id="exampleInputfullName" 
          name="fullName"
          value={input.fullName}
          onChange={handleInputChange}
        />
    </div>
    <div className="mb-3">
        <label 
          htmlFor="exampleInputEmail1" 
          className="form-label">
            Email address
            </label>
        <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
      <div id="emailHelp" className="form-text">
            Your data is safe with us 
      </div>
    </div>
    <div className="mb-3">
        <label 
          htmlFor="exampleInputPassword1" 
          className="form-label">
            Password
        </label>
        <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          name="password"
          value={input.password}
          onChange={handleInputChange}
        />
    </div>
    <div className="mb-3">
        <label 
          htmlFor="exampleInputPhone1" 
          className="form-label">
            Phone
        </label>
        <input 
          type="phone" 
          className="form-control" 
          id="exampleInputPhone1" 
          name="phone"
          value={input.password}
          onChange={handleInputChange}
        />
    </div>
    <div className="mb-3">
        <label 
          htmlFor="exampleInputAddress1" 
          className="form-label">
            Address
        </label>
        <input 
          type="address" 
          className="form-control" 
          id="exampleInputAddress1" 
          name="address"
          value={input.address}
          onChange={handleInputChange}
        />
    </div>
    <div className="mb-3">
        <label 
          htmlFor="exampleInputPost1" 
          className="form-label">
            Post
        </label>
        <input 
          type="post" 
          className="form-control" 
          id="exampleInputPost1" 
          name="post"
          value={input.post}
          onChange={handleInputChange}
        />
    </div>
   
    <button type="submit" className="btn btn-secondary"
          style={{margin: "0.5rem"}}
        >
            Register
        </button>
   </form>
  </div>
    </div>
  )
};

export default Register;
