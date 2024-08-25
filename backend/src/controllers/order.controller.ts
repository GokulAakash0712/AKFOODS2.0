import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";

const createOrder = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("Cart Is Empty");
    return;
  }

  await OrderModel.deleteOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  await newOrder.save();
  res.send(newOrder);
});

const newOrderForCurrentUser = asyncHandler(async (req: any, res: any) => {
  const order = await getNewOrderForCurrentUser(req);
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
});

const pay = asyncHandler(async (req: any, res: any) => {
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);
  if (!order) {
    res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
});

const deliveredStatus = asyncHandler(async (req: any, res: any) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId);
  if (!order) {
    res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
    return;
  }

  if (order.status === OrderStatus.DELIVERED) {
    res.status(HTTP_BAD_REQUEST).send("Order is already delivered!");
    return;
  }

  order.status = OrderStatus.DELIVERED;
  await order.save();
  res.send(order);
});

const trackById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.send(order);
});

const viewOrderDetail = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.send(order);
});

const getAllOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.find({});
  res.send(order);
});

const getOrdersForCurrentUser = asyncHandler(async (req: any, res: any) => {
  const orders = await OrderModel.find({ user: req.user.id });
  res.send(orders);
});

export {
  createOrder,
  newOrderForCurrentUser,
  pay,
  trackById,
  getAllOrder,
  getOrdersForCurrentUser,
  viewOrderDetail,
  deliveredStatus,
};

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}
