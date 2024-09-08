import axios from "axios";
import { token } from "./user.service";


const baseUrl = process.env.REACT_APP_API;


export const createOrder = async(orderData: any, toast: any) => {
    try {
      const res = await axios.post(`${baseUrl}/order/register`, orderData)
      toast(res.data.message)
      return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const getOrder = async(id: string) => {
    try {
       const res = await axios.get(`${baseUrl}/order/${id}`, {
        headers: {
            Authorization: token
        }
       }); 
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const getAllOrders = async() => {
    try {
       const res = await axios.get(`${baseUrl}/orders/all`, {
        headers: {
            Authorization: token
        }
       });
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const updateOrder = async() => {
    try {
        const res = await axios.put(`${baseUrl}/order/update`, {
            Headers: {
                Authorization: token
            }
        });
        return res.data

    } catch (error) {
      console.log(error)  
    }
};

export const deleteOrder = async(id: string) => {
    try {
       const res = await axios.delete(`${baseUrl}/oder/delete/${id}`, {
        headers: {
            Authorization: token
        }
       });
       return res.data.message
        
    } catch (error) {
      console.log(error)  
    }
};