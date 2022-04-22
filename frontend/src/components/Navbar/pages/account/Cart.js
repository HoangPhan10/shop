import styles from "./Account.module.scss";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CgFormatSlash } from "react-icons/cg";
import { BsCartPlus } from "react-icons/bs";
import CallApi from "../../../api/callApi";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("0");
  const id = window.localStorage.getItem("id");
  useEffect(() => {
    if (parseInt(id) > 0) {
      CallApi(`users/${id}`, "GET", null).then((res) => {
        if (res) {
          setCart(res.data.cart);
        }
      });
    } else {
      setCart([]);
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
  const onDelete = (index) => {
    CallApi(`user/cart/${id}/${index}`, "GET", null).then((res) => {
      if (res) {
        setCart(res.data);
      }
    });
  };
  return (
    <div className={styles.cart}>
      <div className={styles.Search}>
        <IoSearchSharp className={styles.cartSearch} />
        <div className={styles.hoverSearch}>
          <input placeholder="Tìm kiếm" />
          <button>
            <IoSearchSharp />
          </button>
        </div>
      </div>
      <div className={styles.cartPrice}>
        <p>GIỎ HÀNG</p> <CgFormatSlash className={styles.cgFormatSlash} />
        <span>{total}đ</span>
        <BsCartPlus className={styles.bsCartPlus} />
        <div className={styles.hoverCart}>
          {cart.length === 0 && <p>Chưa có sản phẩm trong giỏ hàng</p>}
          {cart.length > 0 && (
            <div>
              <div className={styles.Scroll}>
                {cart.map((el, index) => {
                  return (
                    <Nav.Link
                      key={index}
                      className={styles.hoverCartProduct}
                      as={Link}
                      to={`/Cart/${el.url}`}
                    >
                      <img src={el.img} alt="" />
                      <div className={styles.hoverCartProductDiv}>
                        <p>{el.namePrd}</p>
                        <span>
                          {el.quantity} x {el.price}đ
                        </span>
                      </div>
                      <div
                        className={styles.hoverCartProductDiv2}
                        onClick={() => onDelete(index)}
                      >
                        x
                      </div>
                    </Nav.Link>
                  );
                })}
              </div>
              <Nav.Link
                className={styles.hoverCartButton}
                as={Link}
                to="/viewcart"
              >
                XEM GIỎ HÀNG
              </Nav.Link>
              <Nav.Link className={styles.hoverCartButton} as={Link} to ='/payment'>
                THANH TOÁN TIỀN
              </Nav.Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
