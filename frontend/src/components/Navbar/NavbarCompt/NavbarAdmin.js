import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/Navbar.module.scss";
import { BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";

function NavbarAdmin() {
  const [top, setTop] = useState(false);
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  const href = window.location.href.split("/")[3]
  const [index,setIndex]=useState(href)
    useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY >= 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <Container
      fluid
      className={styles.headerNavContainer}
      style={{ display: "flex" }}
    >
      <Nav.Link
        as={Link}
        to="/product"
        className={clsx(
          [styles.headerNavLink],
          index==="product"?[styles.headerNavLinkActive]:"",
        )}  
        onClick={()=>setIndex("product")}
      >
        SẢN PHẨM{" "}
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/users" className={clsx([styles.headerNavLink],index==="users"?[styles.headerNavLinkActive]:"",)}
        onClick={()=>setIndex("users")}
      >
        NGƯỜI DÙNG{" "}
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/orders" className={clsx([styles.headerNavLink],index==="orders"?[styles.headerNavLinkActive]:"",)}
        onClick={()=>setIndex("orders")}
      >
        ĐƠN HÀNG{" "}
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/statis" className={clsx([styles.headerNavLink],index==="statis"?[styles.headerNavLinkActive]:"",)}
        onClick={()=>setIndex("statis")}
      >
        THỐNG KÊ{" "}
      </Nav.Link>{" "}
      {top && (
        <div className={styles.Fixed} onClick={handleClickTop}>
          <BsChevronUp />
        </div>
      )}{" "}
    </Container>
  );
}

export default NavbarAdmin;
