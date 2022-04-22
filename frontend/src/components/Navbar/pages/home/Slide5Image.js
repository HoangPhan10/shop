import styles from "./home.module.scss";
import { Button} from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import CallApi from "./../../../api/callApi";
// 4 image
function SlideImage(props) {
  const [arrSlideImage, setArrSlideImage] = useState([]);
  const {parentCallBack}=props
  useEffect(() => {
    CallApi(`evaluates`, "GET", null).then((res) => {
      const arr = res.data.filter((el) => {
        return el.type === "Polo";
      });
      setArrSlideImage(arr);
    });
  }, []);

  const slideImage = [
    {
      url1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].description.image_1
          : ""
        : "",
      price1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].price + "đ"
          : ""
        : "",
      title1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].nameProduct
          : ""
        : "",
      id1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].id
          : ""
        : "",
      url2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].description.image_1
          : ""
        : "",
      price2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].price + "đ"
          : ""
        : "",
      title2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].nameProduct
          : ""
        : "",
      id2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].id
          : ""
        : "",
      url3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].description.image_1
          : ""
        : "",
      price3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].price + "đ"
          : ""
        : "",
      title3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].nameProduct
          : ""
        : "",
      id3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].id
          : ""
        : "",
      url4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].description.image_1
          : ""
        : "",
      price4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].price + "đ"
          : ""
        : "",
      title4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].nameProduct
          : ""
        : "",
      id4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].id
          : ""
        : "",
        url5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].description.image_1
          : ""
        : "",
      price5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].price + "đ"
          : ""
        : "",
      title5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].nameProduct
          : ""
        : "",
      id5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].id
          : ""
        : ""
    },
    {
      url1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].description.image_1
          : ""
        : "",
      price1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].price + "đ"
          : ""
        : "",
      title1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].nameProduct
          : ""
        : "",
      id1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].id
          : ""
        : "",
      url2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].description.image_1
          : ""
        : "",
      price2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].price + "đ"
          : ""
        : "",
      title2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].nameProduct
          : ""
        : "",
      id2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].id
          : ""
        : "",
      url3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].description.image_1
          : ""
        : "",
      price3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].price + "đ"
          : ""
        : "",
      title3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].nameProduct
          : ""
        : "",
      id3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].id
          : ""
        : "",
      url4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].description.image_1
          : ""
        : "",
      price4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].price + "đ"
          : ""
        : "",
      title4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].nameProduct
          : ""
        : "",
      id4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].id
          : ""
        : "",
        url5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].description.image_1
          : ""
        : "",
      price5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].price + "đ"
          : ""
        : "",
      title5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].nameProduct
          : ""
        : "",
      id5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].id
          : ""
        : ""
    },
  ];
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
    parentCallBack(id)
  }
  return (
    <div className={styles.slide1}>
      <div className="slide-container">
        <Slide>
          {slideImage.map((slideImage, index) => (
            <div className="each-slide" style={{ width: 1200 }} key={index}>
              <div style={{ marginLeft: 72, display: "flex" }}>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url1} alt="slide1" />
                  <p>{slideImage.title1}</p>
                  <span>{slideImage.price1}</span>
                  <div>
                    {slideImage.id1 && (
                      <Button
                        as={Link}
                        to={`/Cart/${slideImage.id1}`}
                        className={styles.slideimage1Hover}
                        onClick={()=>OnAddProduct(slideImage.id1)}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url2} alt="slide1" />
                  <p>{slideImage.title2}</p>
                  <span>{slideImage.price2}</span>
                  <div>
                    {slideImage.id2 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id2}`}
                        onClick={()=>OnAddProduct(slideImage.id2)}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url3} alt="slide1" />
                  <p>{slideImage.title3}</p>
                  <span>{slideImage.price3}</span>
                  <div>
                    {slideImage.id3 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id3}`}
                        onClick={()=>OnAddProduct(slideImage.id3)}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url4} alt="slide1" />
                  <p>{slideImage.title4}</p>
                  <span>{slideImage.price4}</span>
                  <div>
                    {slideImage.id4 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id4}`}
                        onClick={()=>OnAddProduct(slideImage.id4)}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url5} alt="slide1" />
                  <p>{slideImage.title5}</p>
                  <span>{slideImage.price5}</span>
                  <div>
                    {slideImage.id5 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id5}`}
                        onClick={()=>OnAddProduct(slideImage.id5)}
                      >
                        THÊM VÀO GIỎ
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideImage;
