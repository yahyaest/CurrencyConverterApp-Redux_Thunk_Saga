import axios from "axios";
const API_KEY = "454048eb753e524afe37";

export const currencyConverter = async (from, to) => {
  let result = {};
  await axios
    .get(
      `https://free.currconv.com/api/v7/convert?apiKey=${API_KEY}&q=${from}_${to}&compact=y`
    )
    .then((res) => {
      result = res.data;
    });

  return result;
};

export const getCurrencies = async () => {
  let result = {};
  await axios
    .get("http://localhost:5000/currencies/")
    .then((res) => (result = res.data));
  return result;
};

export const getConversions = async () => {
  let result = {};
  await axios
    .get("http://localhost:5000/conversions/")
    .then((res) => (result = res.data));
  return result;
};

export const addConversion = async (from, to, value) => {
  let db = await getConversions();
  let length = db.length;
  let body = {};
  body.id = length + 1;
  body.date = new Date(Date.now());
  body.from = from;
  body.to = to;
  body.value = value;
  console.log(body);
  axios.post("http://localhost:5000/conversions/", body);
};
