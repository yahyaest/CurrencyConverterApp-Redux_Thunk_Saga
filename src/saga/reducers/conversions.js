import axios from "axios";
import { getConversions } from "../../services/currencyConvertor";
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

console.log(slice);

export const { conversionAdded, conversionsLoaded } = slice.actions;
export default slice.reducer;

export function addConversion(from, to, value) {
  let db = getConversions();
  let length = db.length;
  let body = {};
  body.id = length + 1;
  body.date = new Date(Date.now());
  body.from = from;
  body.to = to;
  body.value = value;
  axios
    .post("http://localhost:5000/conversions/", body)
    .then((res) => {})
    .catch((err) => console.log(err));
  return { type: slice.actions.conversionAdded.type, payload: body };
}

export function getConversionsData() {
  return { type: "CONVERSIONS_REQUESTED" };
}
