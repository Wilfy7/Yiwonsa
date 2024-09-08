import { Request, Response } from "express"
import Products from "../models/products.model";




export const createProduct = async (req: Request, res: Response) => {
    try {
        //Get the product info from the request body
        const { name, price, stock, image, description } = req.body

        if(!name || !price || !stock || !image || !description) {
            return res.status(400).json({
                message: "Please provide the product info"
            });
        }

        const product = new Products({
            name: name,
            price: price,
            stock: stock,
            image: image,
            description: description 
        })
        await product.save();

        return res.status(200).json({
            message: "Product created successfully"
        });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
      //Get the id from the params
      const { id } = req.params;

      const existingOrder = await Products.findById(id);

      if(!existingOrder) {
        return res.status(400).json({
            message: "Product does not exist"
        });
      }

      return res.status(200).json({
        message: "Order fetched successfully"
      });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getAllProducts = async (req: Request, res: Response ) => {
    try {
      //Get all products from the database
       const allProducts = await Products.find({});
       
       if(!allProducts) {
        return res.status(400).json({
            message: "Products cannot be fetched"
        });
       }

       return res.status(200).json({
        message: "Products fetched successfully",
        data: allProducts
       });

    } catch (error) {
      return res.status(500).json({
        message:"Server error"
      }); 
    }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    //Get the id from the params
    const { id } = req.params;

    //Get the details of the product from the request body
    const { name, price, stock, image, description } = req.body;

    
      //Check if the product exist
      const existingProduct = await Products.findById(id)
      if (!existingProduct) {

      return res.status(400).json({
        message: "Product info not found"
      });
  }

    const updateProduct = await Products.findByIdAndUpdate(id,
      {name,
      price,
      stock,
      description,
      image},
      {new: true}
      );

      if(!updateProduct) {
        return res.status(400).json({
          message: "Product cannot be found"
        });
      }

      return res.status(200).json({
        message: "Product updated succcessfully",
        data: updateProduct
      })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    //Get the id from the params
    const { id } = req.params;

    const deleteProduct = await Products.findByIdAndDelete(id);

    if(!deleteProduct) {
      return res.status(500).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};