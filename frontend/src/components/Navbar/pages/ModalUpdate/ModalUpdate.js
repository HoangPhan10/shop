import React from "react";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import clsx from "clsx";
/* 
data=[
  {
    placeholder:str,
    value:str,
    valid:str,
    class:,
    disabled
  }
]
infor:str (tên người cần sửa)

*/
function ModalUpdate(props) {
  const { isOpen, data, parentCallBack, cancelUpdate } = props;
  const [dataUpdate, setDataUpdate] = useState([]);
  const [file, setFile] = useState([]);
  const OnChange = (value, index) => {
    setDataUpdate([...data, (data[index].value = value)]);
  };
  const OnChangeFile =(event,index)=>{
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
     setFile([...file,URL.createObjectURL(img)])
    }
  }
  const OnUpdateData = async () => {
    parentCallBack(dataUpdate);
    await setDataUpdate([]);
  };
  file.map((el,index)=>{
    console.log(el)
  })
  return (
    <div>
      <Modal isOpen={!!isOpen}>
        <ModalHeader>Chỉnh sửa thông tin</ModalHeader>
        <ModalBody className="modalBody display-flex">
          <span className="noti display mb-10 fontsz-14">
            Nhập dữ liệu ít nhất 3 ký tự
          </span>
          {data.map((el, index) => {
            return (
              <div key={index} className="internUpdate">
                <strong className="display">
                  {el.placeHolder} <span>*</span>
                </strong>
                {!el.option && !el.file && (
                  <input
                    disabled={el.disabled}
                    className={el.class}
                    type="text"
                    value={el.value}
                    onChange={(e) => OnChange(e.target.value, index)}
                    placeholder={el.placeHolder}
                  />
                )}
                {el.option && (
                  <Select
                    value={el.value}
                    name="skill"
                    options={el.option}
                    onChange={(e) => OnChange(e, index)}
                    className={clsx(
                      "basic-multi-select select-multi",
                      el.class
                    )}
                    classNamePrefix="select"
                  />
                )}
                {el.file && (
                  <div className="upload">
                    <label className="custom-file-upload">
                    <input
                      type="file"
                      className={el.class}
                      onChange={(e) => OnChangeFile(e, index)}
                      multiple
                    ></input>
                   <span>Đính kèm</span>
                  </label>
                  {file.length>0&& <div className="allFile">
                    {file.map((el,index)=>{
                    return(
                     <div key={index} className="file">
                        <span >{el}</span>
                     </div>
                    )
                    })}
                  </div>}
                  </div>
                )}
                <p className="fontsz-12">{el.valid}</p>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => OnUpdateData()}>Sửa</Button>
          <Button color="danger" onClick={() => cancelUpdate()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalUpdate;
