import express from "express";
import devApp from "./config/index.config";
import chalk from "chalk";
import * as functions from "firebase-functions"
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB";


const app = express();


const port = devApp.dev.port;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
    try {
        return res.status(200).json({
            message: "Welcome to Yiwonsa"
        })
    } catch (error) {
      return res.status(500).json({
        message: "Server Error" 
      })  
    }
})

app.listen(port, () => {
    console.log(chalk.yellowBright(`Server running on port http://localhost:${port}`)
    )
});

//Connect the database
connectDB();

//Handle unknown routes
app.use((req: express.Request, res: express.Response) => {
    return res.status(404).json({
        message: "Route not found"
    });
});

export const Yiwonsa = functions.https.onRequest(app)