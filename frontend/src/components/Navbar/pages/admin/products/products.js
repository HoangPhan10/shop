import React from "react";
import { DataTable } from "../../table/Table";
import styles from "./products.module.scss";
import { useState, useEffect } from "react";
import ModalUpdate from "./../../ModalUpdate/ModalUpdate";
import Service from "../../../../api/shopService";
import { converseStr, FORMAT_PRICE, strTrim } from "../../../../../global/const";
import ModalNoti from "./../../ModalNoti/ModalNoti";
import { checkInterger, GENDER } from "../../../../../global/const";
import ModalConfirm from "./../../ModalConfirm/ModalConfirm";
const header = [
  "STT",
  "SẢN PHẨM",
  "CHẤT LIỆU",
  "GIỚI TÍNH",
  "MÀU SẮC",
  "GIÁ",
  "SỐ LƯỢNG",
  "CHỨC NĂNG",
];
const options = [
  { value: "women", label: "Nữ" },
  { value: "men", label: "Nam" },
  { value: "children", label: "Trẻ em" },
];
function Products() {
  const [body, setBody] = useState([]);
  const [message, setMessage] = useState("");
  const [messageAdd, setMessageAdd] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [file, setFile] = useState([]);
  const [idDelete, setIdDelete] = useState(0);
  const [dataUpdate, setDataUpdate] = useState([]);
  useEffect(() => {
    Service.getListProduct().then((res) => {
      setBody(
        res.data.map((el, index) => {
          return {
            id: el.id,
            stt: index + 1,
            name:converseStr(el.name),
            material: converseStr(el.material),
            gender: el.gender === GENDER[0].value ? "Nam" : "Nữ",
            color: converseStr(el.color),
            price: FORMAT_PRICE(el.price) + `đ`,
            quantity: el.amount,
            function: "",
          };
        })
      );
    });
  }, [messageNoti]);
  const Update = (id) => {
    setMessage("Sửa");
    setIdProduct(id);
    Service.getProduct(id).then((res) => {
      setFile(res.data.image);
      setDataUpdate([
        {
          placeHolder: "Tên sản phẩm",
          value: res.data.name,
        },
        {
          placeHolder: "Giá",
          value: res.data.origin_price,
        },
        {
          placeHolder: "Giá giảm",
          value: res.data.price,
        },
        {
          placeHolder: "Số lượng",
          value: res.data.amount,
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
          placeHolder: "Giới tính",
          value: options.find((el) => el.value === res.data.gender),
          option: options,
          class: "inputLink2",
        },
        {
          placeHolder: "Hình ảnh",
          value: res.data.image,
          file: "file",
          class: "inputLink2",
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
    } else if (messageNoti === "Thêm sản phẩm thành công") {
      setMessageNoti("");
      setMessageAdd("");
    } else {
      setMessageNoti("");
    }
  };
  const UpdateData = (data) => {
    if (data.length !== 0) {
      const [
        name,
        origin_price,
        price,
        amount,
        material,
        color,
        gender,
        image,
      ] = data.map((d) => d.value);
      if (
        name?name.trim().length > 2:"" &&
        material.trim().length > 2 &&
        color.value.trim().length > 2 &&
        checkInterger(`${origin_price}`) &&
        checkInterger(`${price}`) &&
        checkInterger(`${amount}`)
      ) {
        Service.updateProduct(idProduct, {
          name: name,
          origin_price: parseInt(origin_price),
          gender: gender.value,
          image: image,
          price: parseInt(price),
          material: material,
          color: color,
          amount: parseInt(amount),
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

  const AddProduct = () => {
    setMessageAdd("Thêm");
    setDataUpdate([
      {
        placeHolder: "Tên sản phẩm",
        value: "",
      },
      {
        placeHolder: "Giá",
        value: "",
      },
      {
        placeHolder: "Giảm giá",
        value: "",
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
      },
      {
        placeHolder: "Giới tính",
        value: { value: "men", label: "Nam" },
        option: options,
        class: "inputLink2",
      },
      {
        placeHolder: "Thêm ảnh",
        value: [],
        file: "file",
        class: "inputLink2",
      },
    ]);
  };
  const CreateData = (data) => {
    if (data.length > 0) {
      const [
        name,
        origin_price,
        price,
        material,
        color,
        amount,
        gender,
        image,
      ] = data.map((d) => d.value);
   
      const check =
        strTrim(name) > 2 &&
        strTrim(material) > 2 &&
        strTrim(color) > 1 &&
        checkInterger(origin_price) &&
        checkInterger(price) &&
        checkInterger(amount) &&
        strTrim(origin_price) > 3 &&
        strTrim(price) > 3 &&
        strTrim(amount) > 0 &&
        image.length > 0;
      if (check) {
        const product = {
          name: name,
          material: material,
          image: image,
          color: color,
          amount: parseInt(amount),
          origin_price: parseInt(origin_price),
          price: parseInt(price),
          gender: gender.value,
        };
        Service.createProduct(product).then((res) => {
          setMessageNoti("Thêm sản phẩm thành công");
        });
      } else {
        setMessageNoti("Vui lòng nhập đầy đủ thông tin");
      }
    } else {
      setMessageNoti("Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH SẢN PHẨM</h4>
        <button className="btn btn-success" onClick={() => AddProduct()}>
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
        cancelUpdate={() => setMessage("")}
        parentCallBack={UpdateData}
        files={file}
      />
      <ModalUpdate
        isOpen={messageAdd}
        data={dataUpdate}
        cancelUpdate={() => setMessageAdd("")}
        parentCallBack={CreateData}
      />
      <ModalNoti message={messageNoti} done={HandleNoti} />
      <ModalNoti message={messageNoti} done={HandleNoti} />
      <ModalConfirm message={messageConfirm} answer={answerConfirm} />
    </div>
  );
}

export default Products;
