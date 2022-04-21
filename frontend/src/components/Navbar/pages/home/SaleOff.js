import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import CallApi from "./../../../api/callApi";

function SaleOff() {
  const [arrImageSale, setArrImageSale] = useState([]);
  useEffect(() => {
    CallApi(`evaluates`, "GET", null).then((res) => {
      const arrSale = res.data.filter((el) => {
        return el.status === "saleProduct";
      });
      setArrImageSale(arrSale);
    });
  }, []);

  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <section className={styles.accessoryHome}>
      <h5>SẢN PHẨM GIẢM GIÁ</h5>
      <div className={styles.accessoryHomeContent}>
        {arrImageSale.map((el, index) => (
          <div key={index}>
            <img src={el.description.image_1} width="238px" height="238px" alt="" />
            <p>{el.nameProduct}</p>
            <strong>{el.price}</strong>
            <Nav.Link
              className={styles.button}
              as={Link}
              to={`/Cart/${el.id}`}
              onClick={()=>OnAddProduct(el.id)}
            >
              THÊM VÀO GIỎ
            </Nav.Link>
            <div className={styles.sale}>
              <p>70%</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SaleOff;
