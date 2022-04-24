export const FORMAT_PRICE = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};
export const checkInterger = (str) => {
  const check = str.split("").every((el) => {
    return parseInt(el) >= 0;
  });
  return check;
};

export const reverseBirthday=(str)=>{
  return str.split("-").reverse().join("-")
}