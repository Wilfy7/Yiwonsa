import { Router } from "express";
import { createPayment, getAllPayment, getSinglePayment } from "../controllers/payment.controllers";


const paymentRouter = Router();


paymentRouter.post("/payment/create", createPayment);
paymentRouter.get("/payments/all", getAllPayment);
paymentRouter.get("/payment/:id", getSinglePayment);



export default paymentRouter;