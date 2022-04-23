import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { OrderNS } from "./order";

export function NewOrderAPI(bll: OrderNS.BLL) {
  const status_type = Object.values(OrderNS.OrderStatus);
  const router = express.Router();

  router.get("/order/list", async (req, res) => {
      const query: OrderNS.QueryOrderParams = {}
    if (req.query.status) {
      query.status= HttpParamValidators.MustBeOneOf(
        req.query,
        "status",
        status_type
      );
    }
    if (req.query.customer_id) {
      query.customer_id = HttpParamValidators.MustBeString(
        req.query,
        "customer_id",
        8
      );
    }
    const orders = await bll.ListOrder(query);
    return res.json(orders);
  });

  router.get("/order/get", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 12);
    const order = await bll.GetViewOrder(id);
    res.json(order);
  });

  router.post("/order/create", async (req, res) => {
    const params: OrderNS.CreateOrderParmas = {
      customer_id: HttpParamValidators.MustBeString(req.body, "customer_id", 8),
      address:HttpParamValidators.MustBeString(req.body, "address",2),
      itemParams: {
        product_id: HttpParamValidators.MustBeString(
          req.body.itemParams,
          "product_id",
          8
        ),
        amount: HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
      },
    };
    const order = await bll.CreateOrder(params);
    res.json(order);
  });

  router.post("/order/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 8);
    const params: OrderNS.UpdateOrderParams = {
      status: HttpParamValidators.MustBeOneOf(req.body, "status", status_type),
    };
    if(req.body.address){
      params.address = HttpParamValidators.MustBeString(req.body, "address",2)
    }
    if (req.body.itemParams) {
      params.itemParams = {
        amount: HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
      };
    }
    const order = await bll.UpdateOrder(id, params);
    res.json(order);
  });
  return router;
}
