export const FORMAT_PRICE = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};
export const checkInterger = (str) => {
  const check = str.split("").every((el) => {
    return parseInt(el) >= 0;
  });
  return check;
};

export const reverseBirthday = (str) => {
  return str.split("-").reverse().join("-");
};
export const strTrim = (str) => {
  return str.trim().length;
};
export const CheckDate = (comp) => {
  let d = parseInt(comp[0], 10);
  let m = parseInt(comp[1], 10);
  let y = parseInt(comp[2], 10);
  let date = new Date(y, m - 1, d);
  if (
    date.getFullYear() === y &&
    date.getMonth() + 1 === m &&
    date.getDate() === d &&
    comp[0].trim().length === 2 &&
    comp[1].trim().length === 2 &&
    comp[2].trim().length === 4
  ) {
    return true;
  }
  return false;
};

export const convertDate = (num) => {
  return new Date(num).toLocaleDateString("en-GB");
};
export const SORT = [
  {
    label: "mới nhất",
    value: 0,
  },
  {
    label: "từ thấp đến cao",
    value: 1,
  },
  {
    label: "từ cao đến thấp",
    value: 2,
  },
];

export const STATUS=[
  {
    label: "hoàn thành",
    value: "done",
  },
  {
    label: "đang chờ xử lý",
    value: "await",
  },
  {
    label: "đã hủy",
    value: "cancel",
  }
]

export const GENDER=[
  {
    label: "nam",
    value: "men",
  },
  {
    label: "nữ",
    value: "women",
  },{
    label: "trẻ em",
    value: "children",
  }
]
export const ROLE=[
  {
    label: "Người quản trị",
    value: "admin",
  },
  {
    label: "người dùng",
    value: "customer",
  }
]
export const converseStr=(str)=>{
  const arrString = str.split(" ").map((el)=>{
    return el.charAt(0).toUpperCase()+el.slice(1)
  })
  return arrString.join(" ")
}