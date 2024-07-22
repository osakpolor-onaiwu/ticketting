import express, { Request, Response } from "express";
import { NotAuthrorizedError, NotFoundError, requireAuth } from "@osastickettingapp/common";
import { Order } from "../models/order";
const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if(!order) throw new NotFoundError();

    if(order.userId !== req.currentUser!.id) throw new NotAuthrorizedError();
    res.send(order);
  }
);

export { router as fetchOrderRouter };
