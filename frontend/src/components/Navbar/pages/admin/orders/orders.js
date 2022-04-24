import React from "react";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import { useState, useEffect } from "react";
import Service from "../../../../api/shopService";
import ModalView from "../../ModalView/ModalView";
import { FORMAT_PRICE } from "./../../../../../global/const";
const header = [
  "STT",
  "ID",
  "SẢN PHẨM",
  "MÀU SẮC",
  "SỐ LƯỢNG",
  "ĐỊA CHỈ",
  "TỔNG",
  "CHỨC NĂNG",
];

function Orders() {
  const [body, setBody] = useState([]);
  const [listCustomer, setListCustomer] = useState([]);
  const [customer, setCustomer] = useState({});
  const [message, setMessage] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});
  useEffect(() => {
    Service.getOrderDone().then((res) => {
      Service.getListCustomer().then((res)=>{
        setListCustomer(res.data)
      })
      setBody(
        res.data.map((el, index) => {
          return {
            id: el.id,
            stt: index + 1,
            user: listCustomer.find((elm)=>elm.id===el.customer_id)?listCustomer.find((elm)=>elm.id===el.customer_id).name:el.customer_id,
            name: el.items[0].product.name,
            color: el.items[0].product.color,
            amount: el.items[0].amount,
            adress: el.address,
            total: FORMAT_PRICE(el.total) + "đ",
            function: "",
          };
        
        })
      );
    });
  }, []);
  const View = (id) => {
    setMessage("View");
    Service.getOrderView(id).then((res)=>{
     setDataUpdate(res.data)
     Service.getCustomer(res.data.customer_id).then((res)=>{
       setCustomer(res.data)
     })
    })
  };
  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH ĐƠN HÀNG</h4>
      </div>
      <DataTable
        noButton={2}
        noButton2={2}
        noButton3={2}
        headers={header}
        body={body}
        parentCallBackUpdate={View}
      />
      <ModalView
        isOpen={message}
        data={dataUpdate}
        customer={customer}
        parentCallBack={() => setMessage("")}
      />
    </div>
  );
}

export default Orders;
