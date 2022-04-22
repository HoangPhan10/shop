import rand from "../lib/rand";
import { ProductNS } from "../product/product";
import {format} from 'date-fns'
export namespace OrderNS{
    export interface Order{
        id:string,
        code:string,
        status:OrderStatus,
        customer_id: string,
        total:number,
        ctime:number,
        mtime:number,
    }

    export enum OrderStatus{
        NEW="new",
        DONE="done",
        CANCLE="cancle"
    }

    export interface Item{
        id:string,
        product_id:string,
        order_id:string,
        amount:number,
        ctime:number,
        mtime:number
    }

    export interface CreateItemParams{
        product_id:string,
        amount:number,
    }

    export interface UpdateItemParams{
        product_id?:string,
        amount?:number
    }
    
    export interface viewItem extends Item{
        product:ProductNS.Product
    }

    export interface viewOrder extends Order{
        items:viewItem[]
    }
    export interface CreateOrderParmas{
        customer_id:string,
        itemParams:CreateItemParams
    }

    export interface UpdateOrderParams{
        status?:OrderStatus
        itemParams?:UpdateItemParams
    }

    export interface QueryOrderParams{
        status?:OrderStatus,
        customer_id?:string
    }
    export interface BLL{
        ListOrder(query:QueryOrderParams):Promise<viewOrder[]>,
        GetViewOrder(id: string):Promise<viewOrder>,
        CreateOrder(params:CreateOrderParmas):Promise<viewOrder>,
        UpdateOrder(id:string,params:UpdateOrderParams):Promise<viewOrder>

        GetItem(id: string):Promise<viewItem>
        UpdateItem(id: string,params:UpdateItemParams):Promise<viewItem>
    }

    export interface DAL{
        ListOrder(query:QueryOrderParams):Promise<Order[]>
        GetOrder(id: string):Promise<Order>
        CreateOrder(order:Order):Promise<void>
        UpdateOrder(order:Order):Promise<void>

        ListItem(product_id: string):Promise<Item[]>
        GetItem(order_id: string):Promise<Item>
        CreateItem(item:Item):Promise<void>
        UpdateItem(item:Item):Promise<void>
    }

    export const Errors={
        OrderNotFound: new Error("Order not found"),
        OrderExist: new Error("Order does exist"),
        ItemNotFound:new Error("Item not found"),
        ItemExists: new Error("Item does exist")
    }

    export const Generator={
        NewOrderID : () => rand.alphabet(12),
        NewOrderCode : () => format(Date.now(), "yyMMddhhmmss"),
        NewItemID:()=>rand.alphabet(12),
    }
}