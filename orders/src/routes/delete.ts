import express, { Request, Response } from "express";
import {
  NotAuthrorizedError,
  NotFoundError,
  requireAuth,
} from "@osastickettingapp/common";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.delete("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('ticket');
  if (!order) throw new NotFoundError();
  if (order.userId!== req.currentUser!.id) throw new NotAuthrorizedError();
  order.status = OrderStatus.Cancelled;
  await order.save();
  //publish event to NATS server
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
      price: order.ticket.price,
    },
    userId: order.userId
  });
  res.send(order); 
});

export { router as deleteOrdersRouter };
