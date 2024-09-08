import { Request, Response } from "express";
import Order from "../models/order.model";


export const createOrder = async (req: Request, res: Response ) => {
    try {
        const {userId, items} = req.body

        if(!userId || !items) 
        return res.status(400).json({
        message: "Please provide order info"
    })

        const order = new Order({
          userId,
          items
        }) 
        await order.save()

        return res.status(200).json({
            message: "Order created successfully"
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      }); 
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        //Get the id from the params
        const { id } = req.params; 

        const existingOrder = await Order.findById(id);

        if(!existingOrder) {
        return res.status(400).json({
        message: "order does not exist"
        });
        }

        return res.status(200).json({
            message: "Order fetched successfully",
            data: existingOrder
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
      //Get all orders from the database
      const allOrders = await Order.find({});
      
      if(!allOrders) {
        return res.status(400).json({
            message: "Orders not found"
        });
      }

      return res.status(200).json({
        message: "Order fetched successfully",
        data: allOrders
      });

    } catch (error) {
      return res.status(500).json({
        message: "Sever error"
      });  
    }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    //Get the order id from the request params
    const { id } = req.params;

    //Get the details of the order from the request body
    const { userId, items } = req.body;

    if(!userId || items ) {
      return res.status(400).json({
        message: "Order details not found"
      });
    }

    const updateOrder = await Order.findByIdAndUpdate(id, 
      {userId, items}, 
      {new: true }
      );

      if(!updateOrder) {
        return res.status(400).json({
          message: "Order not found"
        });
      }

      return res.status(200).json({
        message: "Order updated successfully",
        data: updateOrder
      });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
}; 

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    //Get the id from the request params
    const { id } = req.params;

    const deleteOrder = await Order.findByIdAndDelete(id)

    if(!deleteOrder) {
      return res.status(400).json({
        message: "Order not found"
      })
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};