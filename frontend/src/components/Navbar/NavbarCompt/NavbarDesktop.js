import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/Navbar.module.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";

function NavbarDesktop() {
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
        to="/home"
        className={clsx(
          [styles.headerNavLink],
          index==="home"?[styles.headerNavLinkActive]:"",
          [styles.marginLeft]
        )}  
        onClick={()=>setIndex("home")}
      >
        TRANG CHỦ{" "}
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/introduce" className={clsx([styles.headerNavLink],index==="introduce"?[styles.headerNavLinkActive]:"",)}
        onClick={()=>setIndex("introduce")}
      >
        GIỚI THIỆU{" "}
      </Nav.Link>{" "}
      <div className={styles.hoverNav}>
        <Nav.Link
          as={Link}
          to="/women"
          className={clsx([styles.headerNavLink],index==="women"?[styles.headerNavLinkActive]:"",)}
          style={{ marginTop: 5 }}
        onClick={()=>setIndex("women")}
        >
          NỮ <RiArrowDropDownLine style={{ fontSize: "30px" }} />{" "}
        </Nav.Link>{" "}
        <div className={styles.hoverNavLink}>
          <ul>
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/women/unisex"
            >
              Unisex{" "}
            </Nav.Link>{" "}
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/women/vay"
            >
              Váy{" "}
            </Nav.Link>{" "}
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/women/croptop"
            >
              Áo Croptop{" "}
            </Nav.Link>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <div className={styles.hoverNav}>
        <Nav.Link
          as={Link}
          to="/men"
          className={clsx([styles.headerNavLink],index==="men"?[styles.headerNavLinkActive]:"",)}
          style={{ marginTop: 5 }}
        onClick={()=>setIndex("men")}
        >
          NAM <RiArrowDropDownLine style={{ fontSize: "30px" }} />{" "}
        </Nav.Link>{" "}
        <div className={styles.hoverNavLink1}>
          <ul>
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/men/unisex"
            >
              Unisex
            </Nav.Link>{" "}
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/men/polo"
            >
              Polo{" "}
            </Nav.Link>{" "}
            <Nav.Link
              className={styles.hoverNavLink_Nav}
              as={Link}
              to="/men/shirt"
            >
              Áo sơ mi{" "}
            </Nav.Link>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <Nav.Link as={Link} to="/children" className={clsx([styles.headerNavLink],index==="children"?[styles.headerNavLinkActive]:"",)}
        onClick={()=>setIndex("children")}
      >
        TRẺ EM{" "}
      </Nav.Link>{" "}

      <Nav.Link
        as={Link}
        to="/contact"
        className={clsx([styles.headerNavLink], [styles.marginRight],index==="contact"?[styles.headerNavLinkActive]:"")}
        onClick={()=>setIndex("contact")}
      >
        LIÊN HỆ{" "}
      </Nav.Link>{" "}
      {top && (
        <div className={styles.Fixed} onClick={handleClickTop}>
          <BsChevronUp />
        </div>
      )}{" "}
    </Container>
  );
}

export default NavbarDesktop;
