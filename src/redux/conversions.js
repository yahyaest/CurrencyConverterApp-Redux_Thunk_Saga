import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {getConversions} from "../services/currencyConvertor"

const slice = createSlice({
  name: "conversions",
  initialState: { conversions: [], currentConversion: {} },
  reducers: {
    conversionAdded: (conversions, action) => {
        conversions.conversions.push(action.payload);
    },
    conversionsLoaded: (conversions, action) => {
      conversions.conversions = action.payload;
    },
    conversionLoaded: (conversions, action) => {
      conversions.currentConversion = action.payload;
    },
    conversionRemoved: (conversions, action) => {
      const index = conversions.findIndex(
        (conversion) => conversion.id === action.id
      );
      conversions.splice(index, 1);
    },
  },
});

console.log(slice);

export const {
  conversionAdded,
  conversionsLoaded,
  conversionLoaded,
  conversionRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadConversions = () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/conversions/")
    .then((res) => {
      dispatch({
        type: slice.actions.conversionsLoaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadConversion = (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/conversions/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.conversionLoaded.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const addConversion = (from, to, value) => async (dispatch) => {
  let db = await getConversions();
  let length = db.length;
  let body = {};
  body.id = length + 1;
  body.date = new Date(Date.now());
  body.from = from;
  body.to = to;
  body.value = value;
  console.log(body);
  await axios
    .post("http://localhost:5000/conversions/", body)
    .then((res) => {
      dispatch({
        type: slice.actions.conversionAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
