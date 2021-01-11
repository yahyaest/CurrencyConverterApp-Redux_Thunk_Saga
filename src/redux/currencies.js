import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCurrencies } from "../services/currencyConvertor";

const slice = createSlice({
  name: "currencies",
  initialState: { currencies: [], currentCurrency: {} },
  reducers: {
    currencyAdded: (currencies, action) => {
      currencies.currencies.push(action.payload);
    },
    currenciesLoaded: (currencies, action) => {
      currencies.currencies = action.payload;
    },
    currencyLoaded: (currencies, action) => {
      currencies.currentcurrency = action.payload;
    },
    currencyRemoved: (currencies, action) => {
      const index = currencies.currencies.findIndex(
        (currency) => currency.id === action.id
      );
      currencies.currencies.splice(index, 1);
    },
  },
});

console.log(slice);

export const {
  currencyAdded,
  currenciesLoaded,
  currencyLoaded,
  currencyRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadCurrencies = () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/currencies/")
    .then((res) => {
      dispatch({
        type: slice.actions.currenciesLoaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadCurrency = (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/currencies/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.currencyLoaded.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const addCurrency = (name) => async (dispatch) => {
  let db = await getCurrencies();
  let length = db.length;
  let body = {};
  body.id = length + 1;
  body.name = name;
  console.log(body);
  await axios
    .post("http://localhost:5000/currencies/", body)
    .then((res) => {
      dispatch({
        type: slice.actions.currencyAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteCurrency = (id) => async (dispatch) => {
  await axios
    .delete(`http://localhost:5000/currencies/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.currencyRemoved.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};
