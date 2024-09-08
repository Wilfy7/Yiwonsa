import React, { useState } from "react";
import axios from "axios";
import "./createProductStyles.scss"
import { createProduct } from "../../service/product.service";

export const baseUrl = process.env.REACT_APP_API

const CreateProduct =  () => {
    //State for the form input
    const [file, setFile] = useState<any>()
    const [input, setInput] = useState({
        name: "",
        description: "",
        stock: "",
        price: "",
        category: "",
    });

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value }: any = e.target         
        setInput({
            ...input,
            [name]: value
        })
    };

    const handleInputFileChange = (e: any) => {
        setFile(e.target.files[0])
    };
    
    const image = {file}.file?.name


    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        const data = {
            ...input,
            image
        };
        createProduct(data)
    }
    

    

  return (
    <div className="resgistration__container">
      <div className="restaurant__content">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="price">Price</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputPrice1"
             name="price"
             value={input.price}
             onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputDescription1"
             name="description"
             value={input.description}
             onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputStock1"
             name="stock"
             value={input.stock}
             onChange={handleInputChange}
             required
          />
        </div>
        <div>
          <label htmlFor="stock">Category</label>
          <input
             type="text" 
             className="form-control"
             id="exampleInputCategory1"
             name="category"
             value={input.category}
             onChange={handleInputChange}
             required
          />
        </div>
        <div style={{marginTop: "1.5rem"}}>
          <label htmlFor="message">Image</label>
          <input className="input"
            type="file"
            accept="image/*"
            placeholder="none"
            onChange={handleInputFileChange}
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

export default CreateProduct;
