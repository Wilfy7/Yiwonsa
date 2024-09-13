import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import Menu from "../models/menu.model";


export const createRestaurant = async (req: Request, res: Response) => {
    try {
        //Get the restaurant info from the request body
        const { name, email, address, postalCode, image } = req.body

       // Check if restaurant details are complete
       if(!name || !email || !address || !postalCode || !image) {
       return res.status(400).json({
        message: "Restaurant's name and address required"
    });
   }

   //Register a restaurant
   const newRestaurant = new Restaurant({
    name: name,
    email: email,
    address: address,
    postalCode: postalCode,
    image: image,
   });

   const saveRestaurant = await newRestaurant.save();

   return res.status(200).json({
    message: "Restaurant registered successfully",
    data: saveRestaurant
   });

    } catch (error) {
        console.log(error)
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getRestuarant = async (req: Request, res: Response) => {
    try {
        //Get a restaurant id from the request params
        const restaurantId = req.params.id;

        //Get the restaurant
        const existingRestaurant = await Restaurant.findById(restaurantId);

        if(!existingRestaurant) {
         return res.status(400).json({
            message: "Restaurant not found"
         });
        };

        return res.status(200).json({
            message: "Restaurant fetched successfully",
            data: existingRestaurant
        });

    } catch (error) {
        console.log(error)
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getAllRestaurant = async (req: Request, res: Response) => {
    try {
        //Get all restaurants from the database
        const restaurants = await Restaurant.find({});
        
        if(!restaurants) {
        return res.status(400).json({
            message: "Restaurants not fetched"
        });
        }

        return res.status(200).json({
            message: "Restaurants fetched successfully",
            data: restaurants
        });

    } catch (error) {
      return res.status(500).json({
      message: "Server error"
      }); 
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        // Get the id from params
        const { id } = req.params;

        // Get the details of the restaurant from the request body
        const { name, email, address, postalCode, image } = req.body;

        const existingRestaurant = await Restaurant.findById(id);

        //Check if restaurant exist
        if(!existingRestaurant) {
            return res.status(400).json({
                message: "Restaurant not found"
            });
        };

        const updateRestaurant = await Restaurant.findByIdAndUpdate(id,{
            name,
            email,
            address,
            postalCode,
            image
        },
            {
                new: true
        });

        return res.status(200).json({
            message: "Restaurant updated successfully",
            data: updateRestaurant
        });

    } catch (error) {
        console.log(error)
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
        //Get the id from the params
        const { id } = req.params;

        const deleteRestaurant = await Restaurant.findByIdAndDelete(id);

        if(!deleteRestaurant) {
        return  res.status(400).json({
            message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            message: "Restaurant deleted successfully"
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};


export const getRestaurantMenu = async (req: Request, res: Response) => {
    try {
        //Get the restaurant menu
        const {restaurantId} = req.params;

         
        //Fetch menu from the database base on the restauarantId
        const menuItems = await Menu.find({restaurantId});
         if (!menuItems) {
            return res.status(504).json({
                message: "Not found"
            })
        };
         

         return res.status(200).json({
            message: "Menu fetched successfully",
            menuItems
         });

    } catch (error) {
       return res.status(500).json({
        message: "Server error"
       }); 
    }
};