const Order = require("../../../models/order");
const getAllUserOrders = async (req, res) => {
    try {
      const order = await Order.find({});
      if (!order.length) {
        return res.status(404).json({
          success: false,
          message: "orders not found",
        });
      }
      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (err) {
      console.log("error in getallOrdersbyUserId");
      res.status(500).json({
        success: false,
        message: "Error Occured",
      });
    }
  };

const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
      console.log(orderStatus)
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      await Order.findByIdAndUpdate(id, { orderStatus });
  
      res.status(200).json({
        success: true,
        message: "Order status is updated successfully!",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };
  

  module.exports ={getAllUserOrders, updateOrderStatus }