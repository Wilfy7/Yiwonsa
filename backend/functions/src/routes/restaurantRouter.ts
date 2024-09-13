import { Router } from "express";
import { 
    createRestaurant, 
    deleteRestaurant, 
    getAllRestaurant, 
    getRestaurantMenu, 
    getRestuarant,
    updateRestaurant
} from "../controllers/restaurant.controllers";


const restaurantRouter = Router();


restaurantRouter.post("/restaurants/register", createRestaurant);

restaurantRouter.get("/restaurants/:id", getRestuarant);
restaurantRouter.get("/restaurants", getAllRestaurant);
restaurantRouter.put("/restaurant/update/:id", updateRestaurant);
restaurantRouter.delete("/restaurant/delete/:id", deleteRestaurant);


restaurantRouter.get("/restaurants/:restaurantsId/menu", getRestaurantMenu);



export default restaurantRouter;