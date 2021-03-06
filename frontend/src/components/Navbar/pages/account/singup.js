import { Button, Modal, Nav, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.scss";
import Login from "./Login";
import { FaUserAlt } from "react-icons/fa";
import Service from "../../../api/shopService";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
function Singup() {
  const role =JSON.parse(window.localStorage.getItem("role"))
  const [valueNameUser, setValueNameUser] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [idUser, setIdUser] = useState(id);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggel = () => {
    Service.getLogin({
      username:valueNameUser,
      password:valuePassword
    }).then((respon)=>{
      Service.getCustomer(respon.data.customer_id).then((res)=>{
        window.localStorage.setItem("role", JSON.stringify(res.data.role));
        window.localStorage.setItem("id", JSON.stringify(respon.data.customer_id));
        setToggle(false);
        handleClose();
        setShow2(false);
        window.location.href = "/home";
      })
    }).catch(()=>{
      setToggle(true);
    })
  };
  const answer =(choice)=>{
     if (choice) {
      window.localStorage.setItem("id", JSON.stringify(0));
      window.localStorage.setItem("role", JSON.stringify("customer"));
      setIdUser(0);
      setShow2(true);
      window.location.href = "/home";
    }else{
      setMessage("")
    }
  }
 
  useEffect(() => {
    if (idUser !== 0) {
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
            ????NG NH???P
          </span>

          <Modal size="lg" className={styles.modal} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>????NG NH???P </Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div className={styles.modalContent}>
                <p>T??n ????ng nh???p *</p>
                <input
                  type="text"
                  value={valueNameUser}
                  onChange={(e) => setValueNameUser(e.target.value)}
                  placeholder="Nh???p t??n ????ng nh???p"
                />
                <p>M???t kh???u *</p>
                <input
                  type="password"
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                  placeholder="Nh???p m???t kh???u"
                />
                {toggle && (
                  <p className={styles.modalContentErr}>T??i kho???n kh??ng ????ng</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Login />
              <Button variant="danger" onClick={handleToggel}>
                ????NG NH???P
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {!show2 && (
        <div className={styles.account}>
          <NavDropdown
            title="T??I KHO???N "
            id="basic-nav-dropdown"
            className={styles.accountDropdown}
          >
          {role!=="admin"&&  <NavDropdown.Item as={Link} to="/account/order">
              ????n h??ng
            </NavDropdown.Item>}
            {/* {role!=="admin"&&<NavDropdown.Item as={Link} to="/account/address">
              ?????a ch???
            </NavDropdown.Item>} */}
            <NavDropdown.Item as={Link} to="/account/accountInfor">
              Th??ng tin t??i kho???n
            </NavDropdown.Item>
            <NavDropdown.Item onClick={ ()=>setMessage("B???n c?? ch???c ch???n mu???n ????ng xu???t?")}>
              ????ng xu???t
            </NavDropdown.Item>
          </NavDropdown>
          <FaUserAlt className={styles.accountFaUserAlt} />
        </div>
      )}
      <ModalConfirm message={message} answer={answer}/>
    </>
  );
}
export default Singup;
