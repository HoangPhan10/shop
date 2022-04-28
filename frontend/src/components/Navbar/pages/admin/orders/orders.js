import React from "react";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Service from "../../../../api/shopService";
import ModalView from "../../ModalView/ModalView";
import { converseStr, FORMAT_PRICE } from "./../../../../../global/const";
import Select from "react-select";
import { Label } from "reactstrap";
const minDistance = 10;
const options = [
  { value: "", label: "Tất cả" },
  { value: "women", label: "Nữ" },
  { value: "men", label: "Nam" },
  { value: "children", label: "Trẻ em" },
];
const header = [
  "STT",
  "MÃ ĐƠN HÀNG",
  "SẢN PHẨM",
  "MÀU SẮC",
  "SỐ LƯỢNG",
  "ĐỊA CHỈ",
  "TỔNG",
  "CHỨC NĂNG",
];

const dataBody=(el,index)=>{
  return {
    id: el.id,
    stt: index + 1,
    code: el.code,
    name: converseStr(el.items[0].product.name),
    color: converseStr(el.items[0].product.color),
    amount: el.items[0].amount,
    adress: converseStr(el.info ? el.info.address : ""),
    total: FORMAT_PRICE(el.total) + "đ",
    function: "",
  };
}

function Orders() {
  const [body, setBody] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [customer, setCustomer] = useState({});
  const [message, setMessage] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});
  const [value, setValue] = useState([0, 80]);
  const [selectedOption, setSelectedOption] = useState({
    value:""
  });
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
      if(selectedOption.value.length===0){
        const arrList = listOrder.filter((el) => {
          return el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000;
        });
        setBody(arrList.map((el, index) => {
          return dataBody(el,index)
        }));
      }else{
        const arrList = listOrder.filter((el) => {
          return el.items[0].product.gender === selectedOption.value&&el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000;
        });
        setBody(arrList.map((el, index) => {
          return dataBody(el,index)
        }));
      }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    const arr = listOrder.filter((el) => {
        if (selectedOption.value.trim().length > 0) {
          return el.items[0].product.gender === selectedOption.value&&el.total >= value[0] * 20000 && el.total <= value[1] * 20000
        }
        return el.total >= value[0] * 20000 && el.total <= value[1] * 20000;
    });
    setBody(
      arr.map((el, index) => {
        return dataBody(el,index)
      })
    );
  }, [selectedOption]);

  useEffect(() => {
    Service.getOrderDone().then((res) => {
      setListOrder(res.data);
      setBody(
        res.data.map((el, index) => {
          return dataBody(el,index)
        })
      );
    });
  }, []);
  const View = (id) => {
    setMessage("View");
    Service.getOrderView(id).then((res) => {
      setDataUpdate(res.data);
      Service.getCustomer(res.data.customer_id).then((res) => {
        setCustomer(res.data);
      });
    });
  };
  return (
    <div className={styles.products}>
      <div className={styles.title}>
          <h4>DANH SÁCH ĐƠN HÀNG</h4>
        <div className={styles.orderList}>
          <div className={styles.searchPrice}>
            <p>Lọc theo giá</p>
            <Box sx={{ width: 200 }}>
              <div className={styles.valuePrice}>
                <strong>{FORMAT_PRICE(value[0] * 20000)}</strong>
                <strong>{FORMAT_PRICE(value[1] * 20000)}</strong>
              </div>
              <Slider
                getAriaLabel={() => "Minimum distance shift"}
                value={value}
                onChange={handleChange}
                disableSwap
              />
            </Box>
          </div>
                 <div className=" mb-10 flex">
          <Label className={styles.labelSelect}>Tìm theo giới tính</Label>
          <Select
            className={styles.select}
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <button style={{height:40}} className="btn btn-success">THỐNG KÊ</button>
        </div>
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
