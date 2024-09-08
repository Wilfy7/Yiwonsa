import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const baseUrl = process.env.REACT_APP_API

const CreateRestaurant = () => {
  const [input, setInput] = useState({
    name: "",
    address: "",
    email: "",
    postalCode: ""
  });

  const navigate = useNavigate();

  //Input handler
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setInput({
      ...input,
      [name]: value
    });
    };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/")
  };

  return (
    <div className="create__restaurant">
      <div className="restaurant__content">
      <h2>Create Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Restaurant Name</label>
          <input
            type="text" 
            className="form-control"
            id="exampleInputName1"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputEmail1"
             name="email"
             value={input.email}
             onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputAddress1"
             name="address"
             value={input.address}
             onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputPostalCode1"
             name="postalCode"
             value={input.postalCode}
             onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" 
          className="btn btn-secondary"
          style={{marginLeft: "10rem"}}
          >
          Create 
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
