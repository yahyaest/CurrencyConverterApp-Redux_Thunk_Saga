
import { getCurrencies } from "../../services/currencyConvertor";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "currencies",
  initialState: { currencies: [], currentConversion: {} },
  reducers: {
    currencyAdded: (currencies, action) => {
      currencies.currencies.push(action.payload);
    },
    currenciesLoaded: (currencies, action) => {
      currencies.currencies = action.payload;
    },
  },
});

console.log(slice);

export const { currencyAdded, currenciesLoaded } = slice.actions;
export default slice.reducer;

export function addCurrency(country,name) {
  let db =  getCurrencies();
  let length = db.length;
  let body = {};
  body.id = length + 1;
  body.country = country;
  body.name = name;
  axios
    .post("http://localhost:5000/currencies/", body)
    .then((res) => {})
    .catch((err) => console.log(err));
  return { type:  slice.actions.currencyAdded.type, payload:body };
}

export function getCurrenciesData() {
  return { type: "CURRENCIES_REQUESTED" };
}