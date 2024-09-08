import { Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../helpers/securePassword";
import { genToken } from "../helpers/genToken";

export const createUser = async (req: Request, res: Response) => {
    try {
        //Get the user details from the request body
        const userData = req.body;

        //Check if the data is provided
        const {fullName, email, password, phone } = userData;
        if(!fullName || !email || !password || !phone)
        return res.status(400).json({
        message: "Please provide the reqiured info"
    })

        //Check if user already exist
        const existingUser = await User.findOne({ email: userData.email });
        if(existingUser) 
            return res.status(400).json({ message: "User already exist" });

        // Hash password 
        const hashedPassword = await hashPassword(password);

        //Create a user temporally 
        const newUser = new User({
            ...userData,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

             return res.status(200).json({
                message: "User Succesfully registered",
                savedUser
             });
        
        
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      }); 
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
       //Get the info from req body
       const { email, password } = req.body
       
       //Check if user exist 
       const existingUser = await User.findOne({ email });
       if(!existingUser) 
       return res.status(400).json({
         message: "User doees not exist"
    });
      
    //Chech if password matches
    const isMatch = await comparePassword(password, existingUser.password)
    if(!isMatch)
      return res.status(400).json({
       message: "Invalid credentials"
    }); 

    //Find a user without using password
    const user = await User.findOne({ email }).select({
        password: 0,
    });

    const token = genToken({ user }, )

    return res.status(200).json({
        message: "User logged in successfully",
        token,
        user
    });

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        //Get the id from the request params
        const { id } = req.params;

        //Get user from the database
        const existingUser = await User.findById(id).select({
            password: 0,
            __v: 0
        });
        
        if(!existingUser)
        return res.status(400).json({
        message: "User does not exist"
    });

    return res.status(200).json({
        message: "User Data",
        user: existingUser
    });

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      })  
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //Get all users from the database
        const users = await User.find({}).select({
            password: 0,
            __v: 0
        });

        return res.status(200).json({
            message: "Users fetched successsfully",
            users
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        //Get the id from the params
        const { id } = req.params;

        //Get the details of the user from the request body
        const { fullName, email } = req.body;

        //Check if the user exist 
        const existingUser = await User.findById(id)
        if(!existingUser) {
        return res.status(400).json({
        message: "User does not exist"
   });
}

    const updateUser = await User.findByIdAndUpdate(
        id,
       { fullName, email },
       {new: true}
    );

    if(!updateUser) {
        return res.status(400).json({
            messages: "User not found"
        });
    }

    return res.status(200).json({
        message: "User updated successfully",
        user: updateUser
    });

    } catch (error) {
      return res.status(500).json({
        message: "Serve error"
      });  
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        // Get the id from the requst params
        const { id } = req.params

        //Check if the user exist
        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser)
        return res.status(400).json({
        message: "User not found"
    });

    return res.status(200).json({
        message: "User deleted successfully"
    });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};
