import axios from "axios"



export const baseUrl = process.env.REACT_APP_API

//Retrieve the restaurant data from the local storage
const restaurantData: any = localStorage.getItem("Yiwonsa");

//Convert the data into json and parse it
export const restaurant = JSON.parse(restaurantData);

//Get the token from the data
const { token } = restaurant || "";


export const createRestaurant = async(restaurant: any) => {
 try {
    const res = await axios.post(`${baseUrl}/restaurants/register`, restaurant);
    return res.data;
 } catch (error) {
   console.log(error) 
 } 
  };

  export const getRestaurant = async(restaurant: any, id: string) => {
    try {
        const res = await axios.get(`${baseUrl}/restaurants/${id}`, {
            headers: {
                Authorization: token
            }
        });
        return res.data
    } catch (error) {
      console.log(error)  
    }
  };


  export const getAllRestaurants = async() => {
    try {
       const res = await axios.get(`${baseUrl}/restaurants`, {
        headers: {
        Authorization: token
    }
       }); 
       return res.data
    } catch (error) {
      console.log(error)  
    }
  };


  export const updateRestaurant = async( id: string) => {
    try {
       const res = await axios.put(`${baseUrl}/restaurant/update/${id}`, {
        Headers: {
            Authorization: token
        }
       }); 
       return res.data
    } catch (error) {
      console.log(error)  
    }
  };


  export const deleteRestaurant = async (id: string) => {
    try {
       const res = await axios.delete(`${baseUrl}/restaurant/delete/${id}`, {
        headers: {
            Authorization: token
        }
       });
       return res.data.message 
    } catch (error) {
      console.log(error)  
    }
  }; 


