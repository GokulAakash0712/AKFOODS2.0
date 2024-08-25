import { Router } from "express";
import auth from "../middlewares/auth.mid";
import {
  createOrder,
  deliveredStatus,
  getAllOrder,
  getOrdersForCurrentUser,
  newOrderForCurrentUser,
  pay,
  trackById,
  viewOrderDetail,
} from "../controllers/order.controller";

const router = Router();
router.use(auth);

router.route("/create").post(createOrder);
router.route("/newOrderForCurrentUser").get(newOrderForCurrentUser);
router.route("/pay").post(pay);
router.route("/track/:id").get(trackById);
router.route("/viewOrderDetail/:id").get(viewOrderDetail);
router.route("/deliver/:orderId").put(deliveredStatus);
router.route("/allOrders").get(getAllOrder);
router.route("/myOrders").get(getOrdersForCurrentUser);

export default router;
