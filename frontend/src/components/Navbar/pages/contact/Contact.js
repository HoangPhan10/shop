import styles from "./contact.module.scss";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import banner from "../../../../assets/images/home/banner-11.jpg";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import clsx from "clsx";
function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.contact}>
      <div className={styles.contactTitle}>
        <img src={banner} width="100%" alt="banner" />
        <div className={styles.contactTitleContent}>
          <h4>LIÊN HỆ</h4>
          <div>
            <Nav.Link as={Link} to="/home">
              {" "}
              <h6>TRANG CHỦ</h6>
            </Nav.Link>
            <span>/</span>
            <Nav.Link>
              {" "}
              <h6>LIÊN HỆ</h6>
            </Nav.Link>
          </div>
        </div>
      </div>
      <div className={styles.contactInfor}>
        <div className={styles.contactInforOne}>
          <h5>THÔNG TIN LIÊN HỆ</h5>
          <p>
            {" "}
            <strong>
              <MdLocationOn />
            </strong>
            128 Nguyễn Trãi,Thanh Xuân,Hà Nội
          </p>
          <p>
            {" "}
            <strong>
              <BsTelephoneFill />
            </strong>
            03391234567
          </p>
          <p>
            {" "}
            <strong>
              <MdEmail />
            </strong>
            phanhoang1022002@gmail.com
          </p>
          <div style={{ display: "flex" }}>
            <div className={clsx(styles.hover, styles.facebook)}>
              <a href="https://www.facebook.com">
                <FaFacebookF />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.instagram)}>
              <a href="/home">
                <FaInstagram />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.twitter)}>
              <a href="/home">
                <FaTwitter />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.pinterest)}>
              <a href="/home">
                <FaPinterest />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.feed)}>
              <a href="/home">
                <MdOutlineRssFeed />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.contactInforTwo}>
          <input placeholder="Họ và tên" />
          <input placeholder="Email" />
          <input placeholder="Số điện thoại" />
          <input placeholder="Địa chỉ" />
          <input className={styles.Input} placeholder="Lời nhắn" />
          <button>GỬI</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
