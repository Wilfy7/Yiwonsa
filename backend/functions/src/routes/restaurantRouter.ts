import { Router } from "express";
import { 
    createRestaurant, 
    deleteRestaurant, 
    getAllRestaurant, 
    getRestuarant,
    updateRestaurant
} from "../controllers/restaurant.controllers";


const restaurantRouter = Router();


restaurantRouter.post("/restaurants/register", createRestaurant);

restaurantRouter.get("/restaurants/:id", getRestuarant);
restaurantRouter.get("/restaurants", getAllRestaurant);
restaurantRouter.put("/restaurant/update/:id", updateRestaurant);
restaurantRouter.delete("/restaurant/delete/:id", deleteRestaurant);



export default restaurantRouter;