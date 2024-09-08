import { Router } from "express";
import { 
    createOrder, 
    deleteOrder, 
    getAllOrders, 
    getOrder, 
    updateOrder
} from "../controllers/order.controllers";


const orderRouter = Router();

orderRouter.post("/order/register", createOrder);
orderRouter.get("/order/:id", getOrder);
orderRouter.get("/orders/all", getAllOrders);
orderRouter.put("/order/update/:id", updateOrder);
orderRouter.delete("/order/delete/:id", deleteOrder);


export default orderRouter;