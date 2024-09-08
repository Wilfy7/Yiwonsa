import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/user.service";

const Login = () => {

    const [input, setInput] = useState ({

        email: "",
        password: ""
     });
 
     console.log(input)
 
     //navigate to homepage when user login
     const navigate = useNavigate()

    const handleInputChange = (e: any) => {
        const {name, value} = e.target
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        loginUser(input)
        navigate("/");
    };

  return (
    <>
    <div className="resgistration__container">
    <div className="resgistration__content">
      <h2>Login User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className= "form-label" htmlFor="emailInput">
               Email 
            </label>
            <input 
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              name="email"
              value={input.email} 
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="form-text">
                Your data is safe with us
            </div>
        </div>
        <div className="">
            <label className="form-label" htmlFor="password">
                Password
            </label>
            <input 
              type="text" 
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
        </div>
        <button type="submit" className="btn btn-secondary"
          style={{marginTop: "2rem"}}
        >
         Sign in
        </button>
        <div>
            <p style={{marginTop: "6rem" }}>New to Yiwonsa?</p>
            <Link to="/registration">
                Sign up 
            </Link>
        </div>
      </form>
    </div>
  </div>
</>
  )
};

export default Login;
