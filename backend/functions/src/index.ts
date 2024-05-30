import express from "express";
import * as functions from "firebase-functions";
import morgan from "morgan";
import cors from "cors";


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

//Set up the server
app.use((req: express.Request, res: express.Response) => {
    return res.status(400).json({
        message: "Page not found"
    });
});

export const Yiwonsa = functions.https.onRequest(app);