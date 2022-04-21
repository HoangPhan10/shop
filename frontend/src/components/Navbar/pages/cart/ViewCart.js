import styles from "./cart.module.scss";
import CallApi from "../../../api/callApi";
import { useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";
import { BsBoxArrowLeft } from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";
import { Link } from "react-router-dom";

function ViewCart() {
  const [cart, setCart] = useState([]);
  const id = window.localStorage.getItem("id");
  const [total, setTotal] = useState("0");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (parseInt(id) > 0) {
      CallApi(`users/${id}`, "GET", null).then((res) => {
        if (res) {
          setCart(res.data.cart);
        } else {
          setCart([]);
        }
      });
    } else {
      setCart([]);
    }
  }, [id]);
  const OnDelete = (index) => {
    CallApi(`user/cart/${id}/${index}`, "GET", null).then((res) => {
      if (res) {
        setCart(res.data);
      }
    });
  };
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
  return (
    <div className={styles.viewcart}>
      <div className={styles.viewcartTable}>
        <div className={styles.title}>
          <strong className={styles.titleName}>SẢN PHẨM</strong>
          <strong>GIÁ</strong>
          <strong>SỐ LƯỢNG</strong>
          <strong>TỔNG</strong>
        </div>
        {cart.length > 0 && (
          <div>
            {cart.map((el, index) => {
              return (
                <div key={index} className={styles.content}>
                  <Nav.Link
                    className={styles.contentProduct}
                    as={Link}
                    to={`/Cart/${el.url}`}
                  >
                    <p
                      className={styles.delete}
                      onClick={() => OnDelete(index)}
                    >
                      x
                    </p>
                    <img src={el.img} alt="" />
                    <p>{el.namePrd}</p>
                  </Nav.Link>
                  <p>{el.price}</p>
                  <div className={styles.contentNum}>
                    <p>{el.quantity}</p>
                  </div>
                  <p>
                    {el.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              );
            })}
            <div className={styles.total}>
              <strong>TỔNG:</strong>
              <p>{total}đ</p>
            </div>
            <Nav.Link className={styles.Button} as={Link} to="/store">
              {" "}
              <BsBoxArrowLeft style={{ marginRight: 10 }} />
              TIẾP TỤC XEM SẢN PHẨM
            </Nav.Link>
          </div>
        )}
        {cart.length === 0 && (
          <div>
            <Spinner animation="border" />
            <p>Đang cập nhật</p>
          </div>
        )}
      </div>
      <div className={styles.viewcartTotal}>
        <strong className={styles.Strong}>TỔNG SỐ LƯỢNG</strong>
        <div>
          <strong>Tổng phụ</strong>
          <p>{total}đ</p>
        </div>
        <div>
          <strong>Giao hàng</strong>
          <p>Miễn phí</p>
        </div>
        <div>
          <strong>Tổng tiền phải trả khi nhận hàng</strong>
          <p>{total}đ</p>
        </div>
        <Nav.Link className={styles.viewcartPayment} as={Link} to="/payment">
          TIẾN HÀNH THANH TOÁN
        </Nav.Link>
        <strong className={styles.Strong} style={{ fontSize: 14 }}>
          <AiFillTags /> Phiếu ưu đãi
        </strong>
        <input placeHolder="Mã ưu đãi" />
        <button>Áp dụng</button>
      </div>
    </div>
  );
}
export default ViewCart;
