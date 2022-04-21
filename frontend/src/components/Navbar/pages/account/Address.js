import styles from "./Account.module.scss";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import CallApi from "../../../api/callApi";
function Address() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [toggle2, setToggle2] = useState(false);

  const [name1, setName1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [address1, setAddress1] = useState("");
  const [toggle3, setToggle3] = useState(false);
  const id = JSON.parse(window.localStorage.getItem("id"));
  const index = JSON.parse(window.localStorage.getItem("index"));
  const [addressesUser, setAddressesUser] = useState([]);
  useEffect(() => {
    CallApi(`users/${id}`, "GET", null).then((res) => {
      if (res) {
        setAddressesUser(res.data.addresses);
      }
    });
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const blurPhone = () => {
    const find = addressesUser.find((el) => el.phone === phone);
    if (find) {
      setToggle2(true);
    } else {
      setToggle2(false);
    }
  };
  const blurPhone2 = () => {
    const find = addressesUser.find((el) => el.phone === phone1);
    if (find && addressesUser[index].phone !== phone1) {
      setToggle3(true);
    } else {
      setToggle3(false);
    }
  };
  const handleSubmit = () => {
    if (
      name.trim().length !== 0 &&
      phone.trim().length !== 0 &&
      address.trim().length !== 0 &&
      !toggle2
    ) {
      CallApi(`user/${id}`, "POST", {
        name: name,
        phone: phone,
        addressHome: address,
      }).then((res) => {
        if (res) {
          setAddressesUser(res.data.addresses);
        }
      });

      setName("");
      setPhone("");
      setAddress("");
      handleClose();
    }
  };
  const handleUpdate = (name, phone, address, index) => {
    handleShow3();
    window.localStorage.setItem("index", JSON.stringify(index));
    setName1(name);
    setPhone1(phone);
    setAddress1(address);
  };
  const handleSubmitUpdate = () => {
    if (
      name1.trim().length !== 0 &&
      phone1.trim().length !== 0 &&
      address1.trim().length !== 0 &&
      !toggle3
    ) {
      CallApi(`user/${id}/${index}`, "POST", {
        name: name1,
        phone: phone1,
        addressHome: address1,
      }).then((res) => {
        setAddressesUser(res.data.addresses);
      });
      handleClose3();
    }
  };
  const handleGetIdAddress = (index) => {
    window.localStorage.setItem("index", JSON.stringify(index));
    handleShow2();
  };
  const handleDelete = () => {
    CallApi(`user/${id}/${index}`, "GET", null).then((res) => {
      setAddressesUser(res.data.addresses);
    });
    handleClose2();
  };
  return (
    <div className={styles.address}>
      <div className={styles.addressTitle}>
        <h5>Địa chỉ của tôi</h5>
        <div>
          <Button variant="danger" onClick={handleShow}>
            <GrAdd className={styles.GrAdd} /> Thêm địa chỉ mới
          </Button>

          <Modal
            show={show}
            style={{ marginTop: "150px" }}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: 18 }}>Địa Chỉ Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.addressBody}>
                <input
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "48%", marginRight: "4%" }}
                  type="text"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  style={{ width: "48%" }}
                  onBlur={blurPhone}
                  type="text"
                />

                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Địa chỉ"
                  style={{ width: "100%" }}
                  type="text"
                />
                {toggle2 && (
                  <span style={{ color: "red" }}>
                    Số điện thoại đã được đăng ký
                  </span>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                TRỞ LẠI
              </Button>
              <Button variant="danger" onClick={handleSubmit}>
                HOÀN THÀNH{" "}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {addressesUser.length !== 0 && (
        <>
          {addressesUser.map((address, index) => (
            <div key={index} className={styles.addressContent}>
              <div>
                <p>
                  <strong>Họ và tên</strong>: {address.name}
                </p>
                <p>
                  <strong>Số điện thoại</strong>: {address.phone}
                </p>
                <p>
                  <strong>Địa chỉ</strong>: {address.addressHome}
                </p>
              </div>
              <div className={styles.addressContentHandle}>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleUpdate(
                      address.name,
                      address.phone,
                      address.addressHome,
                      index
                    )
                  }
                  style={{ marginRight: "20px", marginBottom: 10 }}
                >
                  Sửa
                </Button>

                <Modal
                  show={show3}
                  style={{ marginTop: "150px" }}
                  onHide={handleClose3}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa địa chỉ</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className={styles.addressBody1}>
                      <div className={styles.addressBody1Div}>
                        <strong>Họ và tên :</strong>
                        <input
                          placeholder="Họ và tên"
                          value={name1}
                          onChange={(e) => setName1(e.target.value)}
                          style={{ width: "65%", marginLeft: "22px" }}
                          type="text"
                        />
                      </div>
                      <div>
                        <strong>Số điện thoại:</strong>
                        <input
                          value={phone1}
                          onChange={(e) => setPhone1(e.target.value)}
                          onBlur={blurPhone2}
                          placeholder="Số điện thoại"
                          style={{ width: "65%" }}
                          type="text"
                        />
                      </div>

                      <div>
                        <strong>Địa chỉ:</strong>
                        <input
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                          placeholder="Địa chỉ"
                          style={{ width: "65%", marginLeft: "48px" }}
                          type="text"
                        />
                      </div>
                      {toggle3 && <span>Số điện thoại đã được đăng ký</span>}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                      TRỞ LẠI
                    </Button>
                    <Button variant="danger" onClick={handleSubmitUpdate}>
                      SỬA
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant="warning"
                  onClick={() => handleGetIdAddress(index)}
                  style={{ marginBottom: 10 }}
                >
                  Xóa
                </Button>

                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Body>Bạn có chắc muốn xóa địa chỉ này ?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose2}>
                      TRỞ LẠI
                    </Button>
                    <Button variant="success" onClick={handleDelete}>
                      Xóa
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          ))}
        </>
      )}
      {addressesUser.length === 0 && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "30px",
          }}
        >
          <h5>Bạn chưa có địa chỉ</h5>
        </div>
      )}
    </div>
  );
}
export default Address;
