import styles from "./home.module.scss";
import { Button } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
function SlideImage(props) {
  const { slideImage } = props;
  const slideImageSelling = [
    {
      url1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].description.image_1
          : ""
        : "",
      price1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].price + "đ"
          : ""
        : "",
      title1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].nameProduct
          : ""
        : "",
      id1: slideImage ? (slideImage.length > 0 ? slideImage[0].id : "") : "",
      url2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].description.image_1
          : ""
        : "",
      price2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].price + "đ"
          : ""
        : "",
      title2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].nameProduct
          : ""
        : "",
      id2: slideImage ? (slideImage.length > 0 ? slideImage[1].id : "") : "",
      url3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].description.image_1
          : ""
        : "",
      price3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].price + "đ"
          : ""
        : "",
      title3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].nameProduct
          : ""
        : "",
      id3: slideImage ? (slideImage.length > 0 ? slideImage[2].id : "") : "",
      url4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].description.image_1
          : ""
        : "",
      price4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].price + "đ"
          : ""
        : "",
      title4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].nameProduct
          : ""
        : "",
      id4: slideImage ? (slideImage.length > 0 ? slideImage[3].id : "") : "",
    },
    {
      url1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].description.image_1
          : ""
        : "",
      price1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].price + "đ"
          : ""
        : "",
      title1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].nameProduct
          : ""
        : "",
      id1: slideImage ? (slideImage.length > 0 ? slideImage[4].id : "") : "",
      url2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].description.image_1
          : ""
        : "",
      price2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].price + "đ"
          : ""
        : "",
      title2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].nameProduct
          : ""
        : "",
      id2: slideImage ? (slideImage.length > 0 ? slideImage[5].id : "") : "",
      url3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].description.image_1
          : ""
        : "",
      price3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].price + "đ"
          : ""
        : "",
      title3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].nameProduct
          : ""
        : "",
      id3: slideImage ? (slideImage.length > 0 ? slideImage[6].id : "") : "",
      url4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].description.image_1
          : ""
        : "",
      price4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].price + "đ"
          : ""
        : "",
      title4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].nameProduct
          : ""
        : "",
      id4: slideImage ? (slideImage.length > 0 ? slideImage[7].id : "") : "",
    },
  ];
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <div className={styles.slide1}>
      <div className="slide-container">
        <Slide>
          {slideImageSelling.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                className={styles.slide1Image}
                style={{ marginLeft: 45, display: "flex" }}
              >
                <div className={styles.slideimage}>
                  <img src={slideImage.url2} alt="slide1" />
                  <p>{slideImage.title2}</p>
                  <span>{slideImage.price2}</span>
                  <div>
                    <Button
                      className={styles.slideimageHover}
                      as={Link}
                      to={`/Cart/${slideImage.id2}`}
                      onClick={()=>OnAddProduct(slideImage.id2)}
                    >
                      THÊM VÀO GIỎ
                    </Button>
                  </div>
                </div>
                <div className={styles.slideimage}>
                  <img src={slideImage.url1} alt="slide1" />
                  <p>{slideImage.title1}</p>
                  <span>{slideImage.price1}</span>
                  <div>
                    <Button
                      as={Link}
                      to={`/Cart/${slideImage.id1}`}
                      className={styles.slideimageHover}
                      onClick={()=>OnAddProduct(slideImage.id1)}
                    >
                      THÊM VÀO GIỎ
                    </Button>
                  </div>
                </div>
                <div className={styles.slideimage}>
                  <img src={slideImage.url3} alt="slide1" />
                  <p>{slideImage.title3}</p>
                  <span>{slideImage.price3}</span>
                  <div>
                    <Button
                      className={styles.slideimageHover}
                      as={Link}
                      to={`/Cart/${slideImage.id3}`}
                      onClick={()=>OnAddProduct(slideImage.id3)}
                    >
                      THÊM VÀO GIỎ
                    </Button>
                  </div>
                </div>
                <div className={styles.slideimage}>
                  <img src={slideImage.url4} alt="slide1" />
                  <p>{slideImage.title4}</p>
                  <span>{slideImage.price4}</span>
                  <div>
                    <Button
                      className={styles.slideimageHover}
                      as={Link}
                      to={`/Cart/${slideImage.id4}`}
                      onClick={()=>OnAddProduct(slideImage.id4)}
                    >
                      THÊM VÀO GIỎ
                    </Button>
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
