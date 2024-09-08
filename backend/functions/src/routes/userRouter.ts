import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUser, 
    loginUser, 
    updateUser
} from "../controllers/user.controllers";

const userRouter = Router();


userRouter.post("/users/register", createUser);
userRouter.post("/users/login", loginUser);


userRouter.get("/users/:id", getUser);
userRouter.get("/users", getAllUsers);
userRouter.put("/user/update/:id", updateUser);
userRouter.delete("/user/delete/:id", deleteUser);

export default userRouter;