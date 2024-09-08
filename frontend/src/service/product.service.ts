import axios from "axios";


const baseUrl = process.env.REACT_APP_API;

//Retrieve the product data from the local storage
const productData: any = localStorage.getItem("Yiwonsa");


//Convert the data to json
export const product = JSON.parse(productData);

//Get the token from the data
export const { token } = product || "";

export const createProduct = async(product: any) => {
    try {
       const res = await axios.post(`${baseUrl}/product/create`, product) 
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const getProduct = async (id: string) => {
    try {
       const res = await axios.get(`${baseUrl}/product/${id}`) 
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const getAllProduct = async() => {
    try {
       const res = await axios.get(`${baseUrl}/products/all`)  
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const updateProduct = async(id: string, productData: any) => {
    try {
       const res = await axios.put(`${baseUrl}/product/update/${id}`, productData) 
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const deleteProduct = async(id: string) => {
    try {
      const res = await axios.delete(`${baseUrl}/product/delete/${id}`) 
      return res.data.message
       
    } catch (error) {
      console.log(error)  
    }
};

