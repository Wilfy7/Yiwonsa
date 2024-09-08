import express from "express";
import * as functions from "firebase-functions";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRouter";
import restaurantRouter from "./routes/restaurantRouter";
import orderRouter from "./routes/orderRouter";
import productRouter from "./routes/productRouter";
import paymentRouter from "./routes/paymentRouter";


const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors())


//routes for the server
app.get("/", (req: express.Request, res: express.Response) => {
    try {
        return res.status(200).json({
            message: "Welcome to the Yiwonsa API"
        });
    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    };
});

//Routes
app.use("/api/v1", userRouter);
app.use("/api/v1/", restaurantRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", productRouter)
app.use("/api/v1/", paymentRouter);

//Set up the server
app.use((req: express.Request, res: express.Response) => {
    return res.status(400).json({
        message: "Page not found"
    });
});

export const Yiwonsa = functions.https.onRequest(app);