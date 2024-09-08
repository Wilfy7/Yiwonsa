import axios from "axios"; 
import { token } from "./user.service";


const baseUrl = process.env.REACT_APP_API;



export const createPayment = async(paymentData: any, toast: any) => {
    try {
       const res = await axios.post(`${baseUrl}/payment`, paymentData) 
       toast(res.data.message)
       return res.data

    } catch (error) {
      toast(error)  
    }
};


export const getPayment = async(id: string) => {
    try {
        const res = await axios.get(`${baseUrl}/payment/${id}`, {
            headers: {
                Authorization: token
            }
        });
        return res.data
    } catch (error) {
      console.log(error)  
    }
};

export const getAllPayments = async() => {
    try {
       const res = await axios.get(`${baseUrl}/payments/all`, {
        headers: {
        Authorization: token
    }
       })
       return res.data

    } catch (error) {
      console.log(error)  
    }
};

