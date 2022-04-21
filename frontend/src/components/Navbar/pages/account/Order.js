import styles from "./Account.module.scss";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CallApi from "../../../api/callApi";
function Order() {
  const id = JSON.parse(window.localStorage.getItem("id"));
  const index = JSON.parse(window.localStorage.getItem("index"));
  const [orderUser, setOrderUser] = useState([]);
  useEffect(() => {
    CallApi(`users/${id}`, "GET", null).then((res) => {
      if (res) {
        setOrderUser(res.data.order);
      } else {
        setOrderUser([]);
      }
    });
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);
  const handleSubmit = (index) => {
    window.localStorage.setItem("index", JSON.stringify(index));
  };
  const handleDelete = (index) => {
    const result = window.confirm("Bạn có chắc muốn hủy đơn này?");
    if (result) {
      CallApi(`user/order/${id}/${index}`, "GET", null).then((res) => {
        if (res) {
          setOrderUser(res.data.order);
        }
      });
    }
  };
  return (
    <>
      <div className={styles.order}>
        {orderUser.length > 0 && (
          <Table className={styles.orderTable} variant="light">
            <thead>
              <tr style={{ fontSize: "14px" }}>
                <th>ĐƠN HÀNG</th>
                <th>NGÀY</th>
                <th>TÌNH TRẠNG</th>
                <th>TỔNG</th>
                <th>CÁC THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {orderUser.map((el, index) => (
                <tr key={index} style={{ fontSize: "16px", color: "#444" }}>
                  <td>{el.code}</td>
                  <td>{el.day}</td>
                  <td>{el.status}</td>
                  <td>
                    {el.totalPrd}đ cho {el.nameProduct.length} mục
                  </td>
                  <td>
                    <Button
                      variant="success"
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        marginRight: 30,
                      }}
                      as={Link}
                      to="/account/detailOrder"
                      onClick={() => handleSubmit(index)}
                    >
                      XEM
                    </Button>
                    <Button
                      variant="danger"
                      style={{ fontSize: "13px", fontWeight: "700" }}
                      onClick={() => handleDelete(index)}
                    >
                      HỦY
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {orderUser.length === 0 && (
          <div className={styles.orderButton}>
            <Button variant="danger">TỚI CỦA HÀNG </Button>
            <p>Chưa có đơn hàng được tạo ra</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
