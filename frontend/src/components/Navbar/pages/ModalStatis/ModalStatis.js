import React from "react";
import { Row, Col } from "reactstrap";
import styles from "./ModalStatis.module.scss";
import { useEffect,useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FORMAT_PRICE ,GENDER,reduceAmount,reduceTotal} from "../../../../global/const";
function ModalStatis(props) {
  const { isOpen, data, parentCallBack } = props;
  const [totalOrderMen,setTotalOrderMen]=useState(0)
  const [totalOrderWomen,setTotalOrderWomen]=useState(0)
  const [totalOrderChildren,setTotalOrderChildren]=useState(0)
  const [totalAmountMen,setTotalAmountMen]=useState(0)
  const [totalAmountWomen,setTotalAmountWomen]=useState(0)
  const [totalAmountChildren,setTotalAmountChildren]=useState(0)
  const cancelView = () => {
    parentCallBack();
  };
useEffect(()=>{
  const arrOrderMen=data.filter((el)=>el.items[0].product.gender===GENDER[0].value)
  const arrOrderWomen=data.filter((el)=>el.items[0].product.gender===GENDER[1].value)
  const arrOrderChildren=data.filter((el)=>el.items[0].product.gender===GENDER[2].value)
setTotalOrderMen(reduceTotal(arrOrderMen))
setTotalOrderWomen(reduceTotal(arrOrderWomen))
setTotalOrderChildren(reduceTotal(arrOrderChildren))
setTotalAmountMen(reduceAmount(arrOrderMen))
setTotalAmountChildren(reduceAmount(arrOrderChildren))
setTotalAmountWomen(reduceAmount(arrOrderWomen))
},[data])
  return (
    <div>
      <Modal isOpen={!!isOpen}>
        <ModalHeader>Số liệu thống kê</ModalHeader>
        <ModalBody className={styles.modalStatis}>
          <Row className={styles.modalStatisTitle}>
            <Col>
              <strong>MỤC</strong>
            </Col>
            <Col>
              <strong>SỐ LƯỢNG</strong>
            </Col>
            <Col>
              <strong>TỔNG TIỀN</strong>
            </Col>
          </Row>
          <Row>
            <Col>Nam</Col>
            <Col>{totalAmountMen}</Col>
            <Col>{FORMAT_PRICE(totalOrderMen)+"đ"}</Col>
          </Row>
          <Row>
            <Col>Nữ</Col>
            <Col>{totalAmountWomen}</Col>
            <Col>{FORMAT_PRICE(totalOrderWomen)+"đ"}</Col>
          </Row>
          <Row>
            <Col>Trẻ em</Col>
            <Col>{totalAmountChildren}</Col>
            <Col>{FORMAT_PRICE(totalOrderChildren)+"đ"}</Col>
          </Row>
          <Row>
            <Col>
            <strong>TỔNG</strong>
            </Col>
            <Col>{totalAmountChildren+totalAmountMen+totalAmountWomen}</Col>
            <Col>{FORMAT_PRICE(totalOrderChildren+totalOrderMen+totalOrderWomen)+"đ"}</Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => cancelView()}>
            Trở lại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalStatis;
