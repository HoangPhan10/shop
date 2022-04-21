import { Button, Modal, Nav, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.scss";
import Login from "./Login";
import { FaUserAlt } from "react-icons/fa";
// import useLocalStorage from "../../../hooks/useLocalStorage";
import CallApi from "../../../api/callApi";

function Singup() {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [idUser, setIdUser] = useState(id);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggel = () => {
    CallApi("", "GET", null).then((res) => {
      const result = res.data.find((el) => {
        return el.email === valueEmail && el.password === valuePassword;
      });
      if (result) {
        window.localStorage.setItem("id", JSON.stringify(result.id));
        setToggle(false);
        handleClose();
        setShow2(false);
        window.location.href = "/home";
      } else {
        setToggle(true);
      }
    });
  };
  const handleLogout = () => {
    const choice = window.confirm("Bạn có chắc chắn muốn đăng xuất ?");
    if (choice) {
      window.localStorage.setItem("id", JSON.stringify(0));
      setIdUser(0);
      setShow2(true);
      window.location.href = "/home";
    }
  };
  useEffect(() => {
    if (idUser > 0) {
      setShow2(false);
    } else {
      setShow2(true);
    }
  }, [idUser]);
  return (
    <>
      {show2 && (
        <>
          <span
            variant="primary"
            onClick={handleShow}
            className={styles.loginButton}
          >
            ĐĂNG NHẬP
          </span>

          <Modal className={styles.modal} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ĐĂNG NHẬP </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.modalContent}>
                <p>Địa chỉ email *</p>
                <input
                  type="email"
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                  placeholder="Nhập email"
                />
                <p>Mật khẩu *</p>
                <input
                  type="password"
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
                {toggle && (
                  <p className={styles.modalContentErr}>Tài khoản không đúng</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Login />
              <Nav.Link as={Link} onClick={handleClose} to="/home">
                Quên mật khẩu
              </Nav.Link>
              <Button variant="danger" onClick={handleToggel}>
                ĐĂNG NHẬP
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {!show2 && (
        <div className={styles.account}>
          <NavDropdown
            title="TÀI KHOẢN "
            id="basic-nav-dropdown"
            className={styles.accountDropdown}
          >
            <NavDropdown.Item as={Link} to="/account/dashboard">
              Bảng điều khiển
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/account/order">
              Đơn hàng
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/account/dowload">
              Tải xuống
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/account/address">
              Địa chỉ
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/account/accountInfor">
              Thông tin tài khoản
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              Đăng xuất
            </NavDropdown.Item>
          </NavDropdown>
          <FaUserAlt className={styles.accountFaUserAlt} />
        </div>
      )}
    </>
  );
}
export default Singup;
