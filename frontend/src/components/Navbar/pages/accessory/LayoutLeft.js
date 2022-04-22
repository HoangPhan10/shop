import styles from "./accessory.module.scss";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import CallApi from './../../../api/callApi';
function LayoutLeft() {
  const [arrImage,setArrImage]=useState([])
  useEffect(()=>{
    CallApi("evaluates","GET",null).then((res)=>{
      const arr =res.data.filter((el)=>{
        return el.type==="Vay"
      })
      setArrImage(arr.slice(0,5))
    })
  },[])
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <div className={styles.accessoryLeft}>
      <h6>SẢN PHẨM</h6>
      <div className={styles.accessoryLeftList}>
        {arrImage.map((el, index) => (
          <Nav.Link
            key={index}
            as={Link}
            to={`/Cart/${el.id}`}
            className={styles.accessoryLeftListItem}
            onClick={()=>OnAddProduct(el.id)}
          >
            <img src={el.description.image_1} alt="" />
            <div>
              <p>{el.nameProduct}</p>
              <span>{el.price}đ</span>
            </div>
          </Nav.Link>
        ))}
      </div>
    </div>
  );
}

export default LayoutLeft;
