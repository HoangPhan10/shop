import styles from "./cart.module.scss";
import { useEffect, useState } from "react";
import CallApi from "../../../api/callApi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Nav, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Payment() {
  const date = new Date();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [total, setTotal] = useState("0");
  const [value, setValue] = useState("Trả tiền khi nhận hàng");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const id = window.localStorage.getItem("id");
  const now = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  useEffect(() => {
    if (parseInt(id) > 0) {
      CallApi(`users/${id}`, "GET", null).then((res) => {
        if (res) {
          setCart(res.data.cart);
          setAddress(res.data.addresses);
        }
      });
    }
  }, [id]);
  useEffect(() => {
    if (cart.length > 0) {
      const result = cart.reduce((result, prod) => {
        return (
          result +
          parseInt(prod.price.split(",").join("")) * parseInt(prod.quantity)
        );
      }, 0);
      setTotal(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    if (cart.length === 0) {
      setTotal("0");
    }
  }, [cart]);
  const handleOrder = () => {
    if (cart.length > 0 && parseInt(id) > 0) {
      CallApi(`user/${id}`, "POST", {
        order: cart,
        totalPrd: total,
        day: now,
        code: `#${date.valueOf()}`,
        addressDelivery: address[0],
        payment: value,
      });
      CallApi(`users/cart/${id}`, "GET", null);
      setInterval(() => {
        window.location.href = "/account/order";
      }, 2000);
    }
  };
  return (
    <div className={styles.payment}>
      <div className={styles.informationCart}>
        <strong>ĐƠN HÀNG CỦA BẠN</strong>
        <div className={styles.title}>
          <strong>SẢN PHẨM</strong>
          <strong>TỔNG</strong>
        </div>
        {cart.length > 0 && (
          <section>
            {cart.map((el, index) => (
              <div key={index}>
                <p>
                  {el.namePrd} x {el.quantity}
                </p>
                <p>
                  {el.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                </p>
              </div>
            ))}
          </section>
        )}
        {cart.length === 0 && (
          <section>
            <Spinner animation="border" />
            <p>Đang cập nhật</p>
          </section>
        )}
        <div>
          <strong>Tổng phụ</strong>
          <strong>{total}đ</strong>
        </div>
        <div>
          <strong>Giao hàng</strong>
          <span>Giao hàng miễn phí</span>
        </div>
        <div>
          <strong>Tổng</strong>
          <strong>{total}đ</strong>
        </div>
        <div style={{ border: "none" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Trả tiền khi nhận hàng"
                control={<Radio />}
                label="Trả tiền khi nhận hàng"
              />
              <FormControlLabel
                value="Thanh toán qua ngân hàng"
                control={<Radio />}
                label="Thanh toán qua ngân hàng"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <button
          className={styles.Button}
          onClick={handleOrder}
        >
          ĐẶT HÀNG
        </button>
      </div>
      <div className={styles.information}>
        <strong>THÔNG TIN TÀI KHOẢN</strong>
        {address.length > 0 && (
          <section>
            <div>
              <strong>Người nhận hàng:</strong>
              <p>{address[0].name}</p>
            </div>
            <div>
              <strong>Số điện thoại:</strong>
              <p>{address[0].phone}</p>
            </div>
            <div>
              <strong>Địa chỉ:</strong>
              <p>{address[0].addressHome}</p>
            </div>
          </section>
        )}
        {address.length === 0 && <div>Chưa có địa chỉ</div>}
        <Nav.Link className={styles.update} as={Link} to="/account/address">
          {address.length > 0 ? "CHỈNH SỬA" : "THÊM ĐỊA CHỈ"}
        </Nav.Link>
      </div>
    </div>
  );
}

export default Payment;
