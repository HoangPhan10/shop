import React from "react";
import { Zoom } from "react-slideshow-image";
import styles from "./home.module.scss";
function Slideshow(props) {
  const arrImage =props.evaluate.description
  let images = [];
  if(arrImage){
    if(arrImage.image_1){
      images.push(arrImage.image_1);
    }
    if(arrImage.image_2){
      images.push(arrImage.image_2);
    }
    if(arrImage.image_3){
      images.push(arrImage.image_3);
    }
    if(arrImage.image_4){
      images.push(arrImage.image_4);
    }
  }
  const zoomOutProperties = {
    scale: 0.4,
    indicators: (i) => (
      <div className={styles.indicator}>{<img src={images[i]} alt="" />}</div>
    ),
    transitionDuration: 1000,
  };
  return (
  <div>
    {images.length>1 &&(
      <div>
      <Zoom {...zoomOutProperties} className={styles.slideshow}>
        {images.map((each, index) => (
          <img
            key={index}
            className={styles.slideshowImage}
            alt=""
            src={each}
          />
        ))}
      </Zoom>
    </div>
    )}
    {images.length===1&&(
      <div>
      <img className={styles.slideshowImage} style={{marginTop:60}} alt="" src={images[0]} /> 
      </div>
    )}
  </div>
  );
}

export default Slideshow;
