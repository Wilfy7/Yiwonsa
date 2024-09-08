import jwt from "jsonwebtoken";


export const genToken = (user: any) => {
    return jwt.sign({ user }, String(process.env.JWT_SECRET), {
        expiresIn: "3d",
    });
};

export const  verifyToken = (req: any, res: any, next: any) => {
   const token = req.header("auth-token");
   if (!token) return res.status(401).send("Acces denied")

   try {
     const verified = jwt.verify(token, String(process.env.JWT_SECRET));
     req.user = verified;
   } catch (error) {
     res.status(500).send("Invalid token");
   }
};