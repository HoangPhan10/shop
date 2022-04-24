import React from "react";
import { DataTable } from "../../table/Table";
import styles from "./products.module.scss";
import { useState, useEffect } from "react";
import ModalUpdate from "./../../ModalUpdate/ModalUpdate";
import Service from "../../../../api/shopService";
import { FORMAT_PRICE } from "../../../../../global/const";
import ModalNoti from "./../../ModalNoti/ModalNoti";
import { checkInterger } from "../../../../../global/const";
import ModalConfirm from "./../../ModalConfirm/ModalConfirm";
const header = [
  "STT",
  "Tên sản phẩm",
  "Chất liệu",
  "Giới tính",
  "Màu sắc",
  "Giá",
  "Số lượng",
  "Chức năng",
];
const options=[{ value: 'women', label: 'Nữ' },
{ value: 'men', label: 'Nam' },{ value: 'children', label: 'Trẻ em' },]
function Products() {
  const [body, setBody] = useState([]);
  const [message, setMessage] = useState("");
  const [messageAdd, setMessageAdd] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [dataUpdate, setDataUpdate] = useState([]);
  useEffect(() => {
    Service.getListProduct().then((res) => {
      setBody(
        res.data.map((el, index) => {
          return {
            id: el.id,
            stt: index + 1,
            name: el.name,
            material: el.material,
            gender: el.gender,
            color: el.color,
            price: FORMAT_PRICE(el.price) + `đ`,
            quantity: el.amount,
            function: "",
          };
        })
      );
    });
  }, [messageNoti, messageConfirm]);
  const Update = (id) => {
    setMessage("Update");
    setIdProduct(id);
    Service.getProduct(id).then((res) => {
      setDataUpdate([
        {
          placeHolder: "Tên sản phẩm",
          value: res.data.name,
        },
        {
          placeHolder: "Giá",
          value: res.data.price,
        },
        {
          placeHolder: "Giới tính",
          value: options.find(el=>el.value===res.data.gender),
          option:options,
          class: "inputLink",
        },
        {
          placeHolder: "Chất liệu",
          value: res.data.material,
        },
        {
          placeHolder: "Màu sắc",
          value: res.data.color,
        },
        {
          placeHolder: "Số lượng",
          value: res.data.amount,
        },
      ]);
    });
  };
  
  const HandleNoti = () => {
    if (messageNoti === "Sửa thông tin thành công") {
      setMessageNoti("");
      setMessage("");
    } else if (messageNoti === "Xóa thông tin thành công") {
      setMessageNoti("");
      setMessageConfirm("");
    } else {
      setMessageNoti("");
    }
  };
  const UpdateData = (data) => {
    if (data.length !== 0) {
      if (
        data[0].value.trim().length > 2 &&
        data[3].value.trim().length > 2 &&
        data[4].value.trim().length > 2 &&
        checkInterger(`${data[1].value}`) &&
        checkInterger(`${data[5].value}`)
      ) {
        Service.updateProduct(idProduct, {
          name: data[0].value,
          price: parseInt(data[1].value),
          gender: data[2].value.value,
          material: data[3].value,
          color: data[4].value,
          amount: parseInt(data[5].value),
        }).then(() => {
          setMessageNoti("Sửa thông tin thành công");
        });
      } else {
        setMessageNoti("Vui lòng nhập đúng thông tin");
      }
    } else {
      setMessageNoti("Sửa thông tin thành công");
    }
  };
  const Delete = (id) => {
    setMessageConfirm("Bạn có chắc muốn xóa sản phẩm?");
    setIdDelete(id);
  };
  const answerConfirm = (confirm) => {
    if (confirm) {
      Service.deleteProduct(idDelete).then((res) => {
        setMessageNoti("Xóa thông tin thành công");
      });
    } else {
      setMessageConfirm("");
    }
  };

  const AddProduct=()=>{
    setMessageAdd("Thêm")
    setDataUpdate([
      {
        placeHolder: "Tên sản phẩm",
        value: "",
      },
      {
        placeHolder: "Giá",
        value: ""
      },
      {
        placeHolder: "Giảm giá",
        value: ""
      },
     
      {
        placeHolder: "Chất liệu",
        value: "",
      },
      {
        placeHolder: "Màu sắc",
        value: "",
      },
      {
        placeHolder: "Số lượng",
        value: "",
      }, {
        placeHolder: "Giới tính",
        value: { value: 'men', label: 'Nam' },
        option:options,
        class: "inputLink2",
      },
      {
        placeHolder: "Thêm ảnh",
        value: [],
        file:"file",
        class: "inputLink2",
      }, 
    ]);
  }
  const CreateData=(data)=>{
    console.log(data)
  }


 
  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH SẢN PHẨM</h4>
        <button
          className="btn btn-success"
          onClick={() => AddProduct()}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
          Thêm
        </button>
      </div>
      <DataTable
        headers={header}
        body={body}
        parentCallBackUpdate={Update}
        parentCallBack={Delete}
      />
      <ModalUpdate
        isOpen={message}
        data={dataUpdate}
        cancelUpdate={()=>setMessage("")}
        parentCallBack={UpdateData}
      />
      <ModalUpdate
        isOpen={messageAdd}
        data={dataUpdate}
        cancelUpdate={()=>setMessageAdd("")}
        parentCallBack={CreateData}
      />
      <ModalNoti message={messageNoti} done={HandleNoti} />
      <ModalConfirm message={messageConfirm} answer={answerConfirm} />
    </div>
  );
}

export default Products;
