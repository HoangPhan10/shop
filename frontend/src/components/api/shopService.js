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
  UPDATE_PRODUCT: "/product/product/update",
  UPDATE_CUSTOMER: "/customer/customer/update",
  DELETE_PRODUCT: "/product/product/delete",
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
  updateProduct(id, payload) {
    return Http.post(API_ENDPOINT.UPDATE_PRODUCT + `?id=${id}`, payload);
  }
  updateCustomer(id, payload) {
    return Http.post(API_ENDPOINT.UPDATE_CUSTOMER + `?id=${id}`, payload);
  }
  deleteProduct(id) {
    return Http.post(API_ENDPOINT.DELETE_PRODUCT + `?id=${id}`);
  }
}

const Service = new TransactionService();

export default Service;
