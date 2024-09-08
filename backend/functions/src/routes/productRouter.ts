import { Router } from "express";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts,
    getProduct, 
    updateProduct
} from "../controllers/product.controller";



const productRouter = Router()

productRouter.post("/product/create", createProduct);
productRouter.get("/product/:id", getProduct);
productRouter.get("/products/all", getAllProducts);
productRouter.put("/product/update/:id", updateProduct);
productRouter.delete("/product/delete/:id", deleteProduct)

export default productRouter;