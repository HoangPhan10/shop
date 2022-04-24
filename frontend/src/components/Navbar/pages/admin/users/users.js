import React from "react";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import { useState, useEffect } from "react";
import ModalUpdate from "./../../ModalUpdate/ModalUpdate";
import Service from "../../../../api/shopService";
import ModalNoti from "../../ModalNoti/ModalNoti";
const header = [
  "STT",
  "NGƯỜI DÙNG",
  "CCCD",
  "SĐT",
  "NGÀY SINH",
  "CHỨC VỤ",
  "CHỨC NĂNG",
];
const options = [
  { value: "customer", label: "Người dùng" },
  {
    value: "admin",
    label: "Người quản lý",
  },
];
function Users() {
  const [body, setBody] = useState([]);
  const [message, setMessage] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  const [idUpdate,setIdUpdate]=useState(0)
  const [dataUpdate, setDataUpdate] = useState([]);
  useEffect(() => {
    Service.getListCustomer().then((res) => {
      const arrBody = res.data.map((el, index) => {
        return {
          id: el.id,
          stt: index + 1,
          user: el.name,
          cccd: el.cccd,
          phone: el.phone,
          birthday: el.birthday,
          role: el.role,
          function: "",
        };
      });
      setBody(arrBody);
    });
  }, [messageNoti]);
  const Update = (id) => {
    setMessage("Update");
    setIdUpdate(id)
    Service.getCustomer(id).then((res) => {
      setDataUpdate([
        {
          placeHolder: "Phân quyền",
          value: options.find((el) => el.value === res.data.role),
          option: options,
          class:"inputLink2"
        },
      ]);
    });
  };
  
  const UpdateData = (data) => {
    Service.updateCustomer(idUpdate,{
      role:data[0].value.value
    }).then(()=>{
      setMessageNoti("Sửa thông tin thành công.")
    })
  };
  const HandelNoti=()=>{
    setMessage("")
    setMessageNoti("")
  }
  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH NGƯỜI DÙNG</h4>
      </div>
      <DataTable noButton={2} headers={header} body={body} parentCallBackUpdate={Update} />
      <ModalUpdate
        isOpen={message}
        data={dataUpdate}
        cancelUpdate={()=>setMessage("")}
        parentCallBack={UpdateData}
      />
      <ModalNoti message={messageNoti} done={HandelNoti}/>
    </div>
  );
}

export default Users;
