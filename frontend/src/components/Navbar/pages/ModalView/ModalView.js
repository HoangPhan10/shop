import React from "react";
import "./ModalView.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FORMAT_PRICE, reverseBirthday } from "../../../../global/const";
function ModalUpdate(props) {
  const { isOpen, data, parentCallBack, customer } = props;
  const cancelView = () => {
    parentCallBack();
  };
  return (
    <div>
      <Modal isOpen={!!isOpen}>
        <ModalHeader>Thông tin đơn hàng</ModalHeader>
        <ModalBody>
          <div className="flex">
            <div className="view">
              <strong>Họ tên :</strong>
              <p>{customer.name ? customer.name : ""}</p>
            </div>
            <div className="view">
              <strong>Ngày sinh :</strong>
              <p>
                {customer.birthday ? reverseBirthday(customer.birthday) : ""}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="view">
              <strong>Số điện thoại :</strong>
              <p>{customer.phone ? customer.phone : ""}</p>
            </div>
            <div className="view">
              <strong>Căn cước :</strong>
              <p>{customer.cccd ? customer.cccd : ""}</p>
            </div>
          </div>
          <div className="flex">
            <div className="view">
              <strong>Sản Phẩm :</strong>
              <p>{data.items ? data.items[0].product.name : ""}</p>
            </div>
            <div className="view">
              <strong>Màu sắc :</strong>
              <p>{data.items ? data.items[0].product.color : ""}</p>
            </div>
          </div>
         <div className="flex">
         <div className="view">
            <strong>Số lượng :</strong>
            <p>{data.items ? data.items[0].amount : ""}</p>
          </div>
          <div className="view">
            <strong>Tổng tiền :</strong>
            <p>{data.total ? FORMAT_PRICE(data.total) + "đ" : ""}</p>
          </div>
         </div>
          <div className="view">
            <strong>Địa chỉ :</strong>
            <p>{data.address ? data.address : ""}</p>
          </div>
          {data.items && <img src={data.items[0].product.image[0]} alt="" />}
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

export default ModalUpdate;
