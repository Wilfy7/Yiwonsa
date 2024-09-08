import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

//Retrieving the data from the local storage
const userData: any = localStorage.getItem("Yiwonsa");

//Convert the data retrieved to json
export const tokenData = JSON.parse(userData);


//Get the token from the data
export const { token } = tokenData || "";

export const registerUser = async (user: any) => {
  try {
    const res = await axios.post(`${baseUrl}/users/register`, user)
    return res.data
  } catch (error) {
    console.log(error);
  }
};


export const loginUser = async (user: any) => {
    try {
        localStorage.removeItem("Yiwonsa");
        const res = await axios.post(`${baseUrl}/users/login`, user)

        //Save the data to the local storage
        const data = res.data
        console.log(data)
        localStorage.setItem("Yiwonsa", JSON.stringify(data))
        window.location.href = "/" //Redirecting to home page
        return res.data

    } catch (error) {
      console.log(error)  
    }
};

//Get all users
export const getAllUsers = async () => {
    try {
       const res = await axios.get(`${baseUrl}/users`, {
        headers: {
            Authorization: token
        },
       });
       return res.data.users

    } catch (error) {
      console.log(error)  
    }
};

//Get a single user
export const getUser = async (id: string) => {
    try {
       const res = await axios.get(`${baseUrl}/users/${id}`,{
        headers: {
            Authorization: token
        },
       });
       return res.data.user

    } catch (error) {
      console.log(error)  
    }
};

//Update User
export const updateUser = async (id: string) => {
    try {
       const res = await axios.put(`${baseUrl}/user/update/${id}`, {
        headers: {
            Authorization: token
        }
       });
       return res.data

    } catch (error) {
      console.log(error)  
    }
}; 

//Delete User
export const deleteUser = async (id: string) => {
    try {
       const res = await axios.delete(`${baseUrl}/user/delete/${id}`, {
        headers: {
            Authorization: token
        }
       });
       return res.data.message

    } catch (error) {
      console.log(error)  
    }
};

//User logout
export const logUserOut = () => {
    try {
       localStorage.removeItem("Yiwonsa");
       window.location.href = "/login";

    } catch (error) {
      console.log(error)  
    }
};