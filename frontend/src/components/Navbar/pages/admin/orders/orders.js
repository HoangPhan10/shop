import React from "react";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Service from "../../../../api/shopService";
import ModalView from "../../ModalView/ModalView";
import {
  converseStr,
  FORMAT_PRICE,
  TabPanel,
  a11yProps,
  minDistance,
  options,
} from "./../../../../../global/const";
import Select from "react-select";
import { Label } from "reactstrap";
import "react-slideshow-image/dist/styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ModalConfirm from "./../../ModalConfirm/ModalConfirm";
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
const dataBody = (el, index) => {
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
};

function Orders() {
  const [body, setBody] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [bodyAwait, setBodyAwait] = useState([]);
  const [listOrderAwait, setListOrderAwait] = useState([]);
  const [message, setMessage] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});
  const [value, setValue] = useState([0, 80]);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "Tất cả",
  });
  const [id, setId] = useState(0);
  const [valueTab, setValueTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (selectedOption.value.length === 0) {
      const arrList = listOrder.filter((el) => {
        return (
          el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrList.map((el, index) => {
          return dataBody(el, index);
        })
      );
      const arrListAwait = listOrderAwait.filter((el) => {
        return (
          el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000
        );
      });
      setBodyAwait(
        arrListAwait.map((el, index) => {
          return dataBody(el, index);
        })
      );
    } else {
      const arrList = listOrder.filter((el) => {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= newValue[0] * 20000 &&
          el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrList.map((el, index) => {
          return dataBody(el, index);
        })
      );
      const arrListAwait = listOrderAwait.filter((el) => {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= newValue[0] * 20000 &&
          el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrListAwait.map((el, index) => {
          return dataBody(el, index);
        })
      );
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
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= value[0] * 20000 &&
          el.total <= value[1] * 20000
        );
      }
      return el.total >= value[0] * 20000 && el.total <= value[1] * 20000;
    });
    setBody(
      arr.map((el, index) => {
        return dataBody(el, index);
      })
    );
    const arrAwait = listOrderAwait.filter((el) => {
      if (selectedOption.value.trim().length > 0) {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= value[0] * 20000 &&
          el.total <= value[1] * 20000
        );
      }
      return el.total >= value[0] * 20000 && el.total <= value[1] * 20000;
    });
    setBodyAwait(
      arrAwait.map((el, index) => {
        return dataBody(el, index);
      })
    );
  }, [selectedOption]);

  useEffect(() => {
    Service.getOrderDone().then((res) => {
      setListOrder(res.data);
      setBody(
        res.data.map((el, index) => {
          return dataBody(el, index);
        })
      );
    });
    Service.getListOrderAwait().then((res) => {
      setListOrderAwait(res.data);
      setBodyAwait(
        res.data.map((el, index) => {
          return dataBody(el, index);
        })
      );
    });
  }, []);
  const View = (id) => {
    setMessage("View");
    Service.getOrderView(id).then((res) => {
      setDataUpdate(res.data);
    });
  };
  const Complete = (id) => {
    setMessageConfirm("Sản phẩm này đã giao hàng thành công?");
    setId(id);
  };
  const Answer = (choice) => {
    if (choice) {
      Service.updateOrder(id, { status: "done" }).then(() => {
        window.location.reload();
      });
    } else {
      setMessageConfirm("");
    }
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
        </div>
      </div>
      <Box sx={{ width: "100%" }} style={{ paddingLeft: 0 }}>
        <Box
          style={{ paddingLeft: 0 }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={valueTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab
              style={{ padding: 0, fontWeight: 700 }}
              label="ĐƠN HÀNG ĐÃ MUA"
              {...a11yProps(0)}
            />
            <Tab
              label="ĐƠN HÀNG ĐANG CHỜ XỬ LÝ"
              {...a11yProps(1)}
              style={{ padding: 0, margin: "0 50px", fontWeight: 700 }}
            />
          </Tabs>
        </Box>
        <TabPanel style={{ paddingLeft: 0 }} value={valueTab} index={0}>
          <DataTable
            buttonView={"Xem"}
            headers={header}
            body={body}
            parentCallBackUpdate={View}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <DataTable
            buttonView={"Xem"}
            buttonDelete={"Hoàn thành"}
            headers={header}
            body={bodyAwait}
            parentCallBackUpdate={View}
            parentCallBack={Complete}
          />
        </TabPanel>
      </Box>
      <ModalView
        isOpen={message}
        data={dataUpdate}
        parentCallBack={() => setMessage("")}
      />
      <ModalConfirm message={messageConfirm} answer={Answer} />
    </div>
  );
}

export default Orders;
