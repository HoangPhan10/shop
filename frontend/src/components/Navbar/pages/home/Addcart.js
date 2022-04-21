import styles from "./home.module.scss";
import { useState, useEffect, createContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Slideshow from "./SlideShow";
import SlideImage from "./Slide5Image";
import TabsEvaluate from "./TabsEvaluate";
import CallApi from "../../../api/callApi";
import {
  delivery6,
  delivery5,
  delivery4,
  delivery3,
  delivery2,
  delivery1,
} from "../../../../assets/images/home/Delivery/imageDelivery";
import {
  bank6,
  bank5,
  bank4,
  bank3,
  bank2,
  bank1,
} from "../../../../assets/images/home/Bank/imageBank";
export const Images = createContext();
function AddCart(props) {
  const [num, setNum] = useState(1);
  const [idProduct, setIdProduct] = useState("");
  const [evaluate, setEvaluate] = useState({});
  const id = window.localStorage.getItem("id");
  const index = JSON.parse(window.localStorage.getItem("idProduct"));
  console.log(index)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index,idProduct]);
  const handleApart = () => {
    setNum((prev) => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const handleAdd = () => {
    setNum(num + 1);
  };

  const handleAddCart = (namePrd, price, img) => {
    
    if (parseInt(id) === 0) {
      alert("Qúy khách vui lòng đăng nhập");
    } else {
      CallApi(`user/${id}`, "POST", {
        namePrd: namePrd,
        price: price,
        quantity: num,
        total: parseInt(price.split(",").join("")) * num,
        url: index,
        img: img,
      });
      setNum(1);
      setInterval(() => {
        window.location.href = "/viewcart";
      }, 2000);
    }
  };
  useEffect(() => {
    CallApi(`evaluates/${index}`, "GET", null).then((res) => {
      if (res) {
        setEvaluate(res.data);
      }
    });
  }, [index]);
  const addCart =(id)=>{
    setIdProduct(id)
  }
  return (
    <Images.Provider value={props}>
      <div className={styles.addcart}>
        <div style={{ display: "flex",justifyContent:"space-between" }}>
          {/* slideshow */}
          <div>
            {" "}
            <Slideshow evaluate={evaluate} />
          </div>
          {/* ------------- */}
          {evaluate && (
            <div className={styles.addcartContent}>
              <div className={styles.addcartContentTitle}>
                <Nav.Link className={styles.nav} as={Link} to="/home">
                  TRANG CHỦ
                </Nav.Link>
                <span>/</span>
                <Nav.Link
                  className={styles.nav}
                  as={Link}
                  to={evaluate.linkCategory}
                >
                  {evaluate.category}
                </Nav.Link>
                <span>{evaluate.slash}</span>
                <Nav.Link
                  className={styles.nav}
                  as={Link}
                  to={evaluate.linkType}
                >
                  {evaluate.type}
                </Nav.Link>
              </div>
              <h3>{evaluate.nameProduct}</h3>
              <strong>{evaluate.price}đ</strong>
              <div className={styles.addcartContentPrice}>
                <div>
                  {" "}
                  <p onClick={handleApart}>-</p> <p>{num}</p>{" "}
                  <p onClick={handleAdd}>+</p>
                </div>
                <button
                  className={styles.Button}
                  onClick={() =>
                    handleAddCart(
                      evaluate.nameProduct,
                      evaluate.price,
                      evaluate.description.image_1
                    )
                  }
                >
                  THÊM VÀO GIỎ
                </button>
              </div>
              <div style={{ marginLeft: 17, display: "flex" }}>
                <div className={styles.delivery}>
                  <span>Tính phí ship tự động</span>
                  <img alt="" src={delivery1} />
                  <img alt="" src={delivery2} />
                  <img alt="" src={delivery3} />
                  <img alt="" src={delivery4} />
                  <img alt="" src={delivery5} />
                  <img alt="" src={delivery6} />
                </div>
                <div className={styles.bank}>
                  <span>Thanh toán</span>
                  <img alt="" src={bank1} />
                  <img alt="" src={bank2} />
                  <img alt="" src={bank3} />
                  <img alt="" src={bank4} />
                  <img alt="" src={bank5} />
                  <img alt="" src={bank6} />
                </div>
              </div>
              <p className={styles.p}>
                "Hãy trở thành Affilicate của chúng tôi để tìm thêm thu nhập thụ
                động, kiếm tiền online"
              </p>
              <Button
                variant="contained"
                color="error"
                className={styles.Button}
              >
                Đăng ký Affilicate
              </Button>
            </div>
          )}
          {!evaluate && <h4>Đang load</h4>}
        </div>
        <TabsEvaluate />
        <div className={styles.slide5Image}>
          <h4>SẢN PHẨM TƯƠNG TỰ</h4>
          <SlideImage parentCallBack={addCart} />
        </div>
      </div>
    </Images.Provider>
  );
}

export default AddCart;
