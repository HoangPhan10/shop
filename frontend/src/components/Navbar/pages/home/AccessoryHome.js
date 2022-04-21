import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import banner from "../../../../assets/images/home/banner-1.jpg";
import CallApi from "./../../../api/callApi";
import { useEffect, useState } from "react";
function AccessoryHome() {
  const [arrImageLastest, setArrImageLastest] = useState([]);
  useEffect(() => {
    CallApi(`evaluates`, "GET", null).then((res) => {
      const arrSale = res.data.filter((el) => {
        return el.status === "lastestProduct";
      });
      setArrImageLastest(arrSale);
    });
  }, []);
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <section className={styles.accessoryHome}>
      <h5>SẢN PHẨM MỚI NHẤT</h5>
      <div className={styles.accessoryHomeContent}>
        {arrImageLastest.map((el, index) => (
          <div key={index}>
            <img
              src={el.description.image_1}
              width="238px"
              height="238px"
              alt=""
            />
            <p>{el.nameProduct}</p>
            <strong>{el.price}</strong>
            <Nav.Link className={styles.button} as={Link} to={`Cart/${el.id}`} onClick={()=>OnAddProduct(el.id)}>
              THÊM VÀO GIỎ
            </Nav.Link>
          </div>
        ))}
      </div>
      <Nav.Link className={styles.viewAll} as={Link} to="/men">
        XEM TẤT CẢ
      </Nav.Link>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
        <div>
          <h1>
            KHUYẾN MÃI <span>GIẢM GIÁ 50%</span>
          </h1>
          <Nav.Link className={styles.bannerAll} as={Link} to="/women">
            XEM TẤT CẢ
          </Nav.Link>
        </div>
      </div>
    </section>
  );
}

export default AccessoryHome;
