import { Http } from "./http.js";

const API_ENDPOINT = {
  LIST_PRODUCT: "/product/product/list",
  LIST_SALE: "/product/product/sale",
  LIST_CUSTOMER: "/customer/customer/list",
  GET_CUSTOMER: "/customer/customer/get",
  GET_ORDER: "/order/order/list?status=new",
  GET_ORDER_VIEW: "/order/order/get",
  GET_PRODUCT: "/product/product/get",
  GET_COMMENT: "/product/comment/list",
  GET_LOGIN: "/auth/login",
  GET_ORDER_DONE:"/order/order/list?status=done",
  GET_ORDER_CANCEL:"/order/order/list?status=cancel",
  GET_ORDER_AWAIT:"/order/order/list?status=await",
  UPDATE_PRODUCT: "/product/product/update",
  UPDATE_CUSTOMER: "/customer/customer/update",
  DELETE_PRODUCT: "/product/product/delete",
  CREATE_PRODUCT:"/product/product/create",
  CREATE_COMMENT:"/product/comment/create",
  CREATE_ORDER:"/order/order/create",
  SET_PASSWORD:"/auth/customer/set_password",
  UPDATE_ORDER:"/order/order/update",
  GET_LIST_ORDER_CUSTOMER:"/order/order/list"

};
class TransactionService {
  constructor() {
    if (TransactionService._instance) {
      return TransactionService._instance;
    }
    TransactionService._instance = this;

    // ... Your rest of the constructor code goes after this
  }
  getListProduct() {
    return Http.get(API_ENDPOINT.LIST_PRODUCT);
  }
  getListCustomer() {
    return Http.get(API_ENDPOINT.LIST_CUSTOMER);
  }
  getProduct(id) {
    return Http.get(API_ENDPOINT.GET_PRODUCT + `?id=${id}`);
  }
  getOrder(id) {
    return Http.get(API_ENDPOINT.GET_ORDER + `&customer_id=${id}`);
  }
  getOrderView(id) {
    return Http.get(API_ENDPOINT.GET_ORDER_VIEW + `?id=${id}`);
  }
  getOrderDone(){
    return Http.get(API_ENDPOINT.GET_ORDER_DONE);
  }
  getOrderDone2(id){
    return Http.get(API_ENDPOINT.GET_ORDER_DONE+`&customer_id=${id}`);
  }
  getOrderCancel(id){
    return Http.get(API_ENDPOINT.GET_ORDER_CANCEL+`&customer_id=${id}`);
  }
  getOrderAwait(id){
    return Http.get(API_ENDPOINT.GET_ORDER_AWAIT+`&customer_id=${id}`);
  }
  getCustomer(id) {
    return Http.get(API_ENDPOINT.GET_CUSTOMER + `?id=${id}`);
  }
  getLogin(payload) {
    return Http.post(API_ENDPOINT.GET_LOGIN, payload);
  }
  getComment(id) {
    return Http.get(API_ENDPOINT.GET_COMMENT + `?product_id=${id}`);
  }
  getListSale() {
    return Http.get(API_ENDPOINT.LIST_SALE);
  }
  getListOrderCustomer(id) {
    return Http.get(API_ENDPOINT.GET_LIST_ORDER_CUSTOMER+ `?status=new&customer_id=${id}`);
  }
  updateProduct(id, payload) {
    return Http.post(API_ENDPOINT.UPDATE_PRODUCT + `?id=${id}`, payload);
  }
  updateCustomer(id, payload) {
    return Http.post(API_ENDPOINT.UPDATE_CUSTOMER + `?id=${id}`, payload);
  }
  updateOrder(id,payload){
    return Http.post(API_ENDPOINT.UPDATE_ORDER + `?id=${id}`, payload);
  }
  deleteProduct(id) {
    return Http.post(API_ENDPOINT.DELETE_PRODUCT + `?id=${id}`);
  }
  createProduct(payload) {
    return Http.post(API_ENDPOINT.CREATE_PRODUCT,payload);
  }
  createComment(payload) {
    return Http.post(API_ENDPOINT.CREATE_COMMENT,payload);
  }
  createOrder(payload) {
    return Http.post(API_ENDPOINT.CREATE_ORDER,payload);
  }
  setPassword(payload){
    return Http.post(API_ENDPOINT.SET_PASSWORD,payload);
  }

}

const Service = new TransactionService();

export default Service;
