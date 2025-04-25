const paypal = require("../../helpers/paypal");
const Cart = require("../../models/Cart");
const Order = require("../../models/order");
const Product = require("../../models/Products");

const createOrder = async (req, res) => {
  try {
    const { cartId, userId, cartItems, addressInfo,orderStatus, paymentMethord, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId,} = req.body;
    console.log("cartId", cartId);
    const createPaymentJson = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price?.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount?.toFixed(2),
          },
          description: "description",
        },
      ],
    };
    paypal.payment.create(createPaymentJson, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error While Creating Paypal Payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
        cartId,userId, cartItems,addressInfo, orderStatus,paymentMethord,paymentStatus, totalAmount, orderDate,orderUpdateDate,  paymentId,  payerId,});
        await newlyCreatedOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "catched Error Occured",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: " Order not found",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      console.log(product, "order.cartItems");

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "catched Error Occured",
    });
  }
};
const getAllOrdersbyUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const order = await Order.find({ userId });
    if (!order.length) {
      return res.status(404).json({
        success: false,
        message: "orders not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Orders Fetched successfuly",
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

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(201).json({
      success: true,
      // message:'order fetch success',
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "fetch order details Failed",
    });
  }
};

module.exports = {
  capturePayment,
  createOrder,
  getOrderDetails,
  getAllOrdersbyUser,
};
