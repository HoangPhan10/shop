import { OrderNS } from "./order";
import { Db } from "mongodb";
import {
  FromMongoData,
  MongoErrorCodes,
  MongoModel,
  ToMongoData,
} from "../lib/mongodb";
import { FilterData } from "../common/filter_data_handlers";
export class OrderMongoDAL implements OrderNS.DAL {
  constructor(private db: Db) {}
  private col_order = this.db.collection<MongoModel<OrderNS.Order>>("order");
  private col_item = this.db.collection<MongoModel<OrderNS.Item>>("item");

  async init() {}

  async ListItem(product_id: string) {
    const items = await this.col_item
      .find({ product_id: product_id })
      .toArray();
    return FilterData.Many(FromMongoData.Many<OrderNS.Item>(items));
  }
  async GetItem(order_id: string) {
    const item = await this.col_item.findOne({ order_id: order_id });
    return FromMongoData.One<OrderNS.Item>(item);
  }

  async CreateItem(item: OrderNS.Item) {
    const doc = ToMongoData.One<OrderNS.Item>(item);
    try {
      await this.col_item.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw OrderNS.Errors.ItemExists;
      }
      throw error;
    }
  }

  async UpdateItem(item: OrderNS.Item) {
    const doc = ToMongoData.One<OrderNS.Item>(item);
    try {
      await this.col_item.updateOne({ _id: item.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }

  async ListOrder(query:OrderNS.QueryOrderParams) {
    if(Object.keys(query).length==1){
        const {status}=query
        const orders = await this.col_order
        .find({status:status})
        .toArray();
      return FromMongoData.Many<OrderNS.Order>(orders);
    }
    if(Object.keys(query).length==2){
        const {status,customer_id}=query
        const orders = await this.col_order
        .find({status:status,customer_id:customer_id})
        .toArray();
      return FromMongoData.Many<OrderNS.Order>(orders);
    }
    const orders = await this.col_order
        .find()
        .toArray();
      return FromMongoData.Many<OrderNS.Order>(orders);
  }

  async GetOrder(id: string) {
    const order = await this.col_order.findOne({ _id: id });
    return FromMongoData.One<OrderNS.Order>(order);
  }

  async CreateOrder(order: OrderNS.Order) {
    const doc = ToMongoData.One<OrderNS.Order>(order);
    try {
      await this.col_order.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw OrderNS.Errors.OrderExist;
      }
      throw error;
    }
  }

  async UpdateOrder(order: OrderNS.Order) {
    const doc = ToMongoData.One<OrderNS.Order>(order);
    try {
      await this.col_order.updateOne({ _id: order.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }
}
