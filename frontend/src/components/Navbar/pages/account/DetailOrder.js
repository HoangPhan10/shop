import styles from "./Account.module.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CallApi from "../../../api/callApi";
import { useState, useEffect } from "react";
import Service from "../../../api/shopService";
import { FORMAT_PRICE } from "../../../../global/const";
function DetailOrder() {
  const index = JSON.parse(window.localStorage.getItem("index"));
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [orderUser, setOrderUser] = useState([]);
  useEffect(() => {
    if (parseInt(id)!== 0) {
      Service.getOrder(id).then((res)=>{
        setOrderUser(res.data)
      })
    } else {
      setOrderUser([]);
    }
  }, [id]);
  console.log(index)
  return (
    <>
      {orderUser.length > 0 && (
        <div className={styles.detailOrder}>
          <p className={styles.detailOrderTitle}>
            {" "}
            Đơn hàng <span>{orderUser[index].code}</span> đã được đặt vào ngày{" "}
            <span>{orderUser[index].ctime}</span> và hiện tại là{" "}
            <span>{orderUser[index].status}</span>
          </p>
          <h4>Chi tiết đơn hàng</h4>
          <div style={{ borderBottom: "3px solid #eee" }}>
            <p>SẢN PHẨM</p>
            <p>TỔNG</p>
          </div>
          {orderUser[index].items.map((el, index) => (
            <div key={index}>
              <span>
                {el.product.name} ({FORMAT_PRICE(el.product.price)}đ x {el.amount} x {el.product.color})
              </span>
              <strong>
              {FORMAT_PRICE(el.product.price)}đ
              </strong>
            </div>
          ))}
          <div>
            <strong>Tổng số phụ:</strong>
            <strong>{FORMAT_PRICE(orderUser[index].total)}đ</strong>
          </div>
          <div>
            <strong>Giao nhận hàng:</strong>
            <span>Giao hàng miễn phí</span>
          </div>
          <div>
            <strong>Phương thức thanh toán:</strong>
            <span>Thanh toán tiền mặt</span>
          </div>
          <div>
            <strong>Tổng cộng:</strong>
            <strong>{FORMAT_PRICE(orderUser[index].total)}đ</strong>
          </div>

          <h4 style={{ marginTop: "20px" }}>Địa chỉ thanh toán</h4>
          {/* <section>
            <strong>Địa chỉ:</strong>
            <p>{orderUser[index].addressDelivery.addressHome}</p>
          </section>
          <section>
            <strong>Số điện thoại:</strong>
            <p>{orderUser[index].addressDelivery.phone}</p>
          </section>
          <section>
            <strong>Tên người nhận :</strong>
            <p>{orderUser[index].addressDelivery.name}</p>
          </section> */}
          <Button
            variant="danger"
            style={{ marginBottom: "50px" }}
            as={Link}
            to="/account/order"
          >
            TRỞ LẠI
          </Button>
        </div>
      )}
      {orderUser.length === 0 && <h1>xinchao</h1>}
    </>
  );
}
export default DetailOrder;
