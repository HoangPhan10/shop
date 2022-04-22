import styles from "./accessory.module.scss";
import {useState,useEffect} from 'react'
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import CallApi from "../../../api/callApi";
function LayoutRight() {
  const [page,setPage] =useState(1)
  const [numPage,setNumPage]=useState(1)
  const [arrImage,setArrImage]=useState([])
  const [arrImageList,setArrImageList]=useState([])
  const pathname=window.location.pathname
  let arrPage=[]
  useEffect(()=>{
    CallApi(`evaluates`, "GET", null).then((res) => {
      const arrSale = res.data.filter((el) => {
        if(pathname.split("/")[2]&&el.type){
          return el.type.toLowerCase() ===pathname.split("/")[2];
        }
        return el.gender.toLowerCase() ===pathname.split("/")[1];
      });
      setArrImageList(arrSale)
      setArrImage(arrSale.slice((page-1)*12,page*12))
    }); 
  },[page,pathname])
  for(let i=1;i<=numPage;i++){

    arrPage.push({id:i})
  }
  const handleApart =()=>{
    setPage(page=>{
      if(page===1){
        return page
      }
      return page-1
    })
  }
  const handleAdd =()=>{
    setPage(page=>{
      if(page===numPage){
        return page
      }
      return page+1
    })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
 useEffect(()=>{
    setNumPage(Math.ceil(arrImageList.length/12))
  },[arrImageList])
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <div className={styles.accessoryRight}>
      <div className={styles.accessoryRightSelect}>
       {numPage===1&& <p>Hiện thị một kết quả duy nhất</p>}
       {numPage>1&& <p>Hiện thị kết quả trang số {page}</p>}
        <Form.Select
          className={styles.accessoryRightSelectButton}
          aria-label="Default select example"
        >
          <option>Thứ tự mặc định</option>
          <option value="1">Mới nhất</option>
          <option value="2">Thứ tự theo giá:thấp đến cao</option>
          <option value="3">Thứ tự theo giá:cao xuống thấp</option>
        </Form.Select>
      </div>
      <div className={styles.accessoryRightLayout}>
        {arrImage.map((el, index) => (
          <div key={index}>
            <img src={el.description.image_1} alt="" />
            <p>{el.nameProduct}</p>
            <strong>{el.price}</strong>
            <Nav.Link
              className={styles.Button}
              as={Link}
              to={`/Cart/${el.id}`}
              onClick={()=>OnAddProduct(el.id)}
            >
              THÊM VÀO GIỎ
            </Nav.Link>
          </div>
        ))}
      </div>
      {numPage>1&&(<div className={styles.pagination}>
        <div onClick={()=>handleApart()}><AiOutlineLeft/></div>
        {arrPage.map((el, index)=>(
          <p key={index} style={{"backgroundColor":page===index+1?"red":"","color":page===index+1?"white":"","borderColor":page===index+1?"red":""}} onClick={()=>setPage(el.id)}>{el.id}</p>
        ))}
        <div onClick={()=>handleAdd()}><AiOutlineRight/></div>
      </div>)}
    </div>
  );
}

export default LayoutRight;
