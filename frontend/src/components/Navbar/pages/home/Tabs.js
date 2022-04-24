import styles from "./home.module.scss";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { useEffect,useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide4Image from "./Slide4Image";
import CallApi from './../../../api/callApi';
import Service from '../../../api/shopService'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [arrProductSelling,setArrProductSelling]=useState([])
  const [arrProductNew,setArrProductNew]=useState([])
  const [arrProductPopular,setArrProductPopular]=useState([])
  useEffect(() => {
    Service.getListProduct().then((res)=>{
     setArrProductNew(res.data.slice(res.data.length-8))
     setArrProductSelling(res.data.slice(0,8))
     setArrProductPopular(res.data.slice(8,16))
    })
   
    // CallApi(`evaluates`, "GET", null).then((res) => {
    //   const arrSell=res.data.filter((el)=>{
    //     return el.status==="sellingProduct"
    //   })
    //   const arrNew=res.data.filter((el)=>{
    //     return el.status==="newProduct"
    //   })
    //   const arrPopular=res.data.filter((el)=>{
    //     return el.status==="popularProduct"
    //   })
    //   setArrProductNew(arrNew)
    //   setArrProductPopular(arrPopular)
    //   setArrProductSelling(arrSell)
    // });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.BasicTabs} sx={{ width: "100%" }}>
      <Box
        className={styles.box}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab className={styles.tab} label="SẢN PHẨM MỚI" {...a11yProps(0)} />
          <Tab
            className={styles.tab}
            label="SẢN PHẨM BÁN CHẠY"
            {...a11yProps(1)}
          />
          <Tab
            label="SẢN PHẨM PHỔ BIẾN"
            className={styles.tab2}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel className={styles.tabPanel} value={value} index={0}>
        <Slide4Image  slideImage={arrProductNew} />
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={1}>
        <Slide4Image slideImage={arrProductSelling} />
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={2}>
        <Slide4Image slideImage={arrProductPopular} />
      </TabPanel>
    </Box>
  );
}
