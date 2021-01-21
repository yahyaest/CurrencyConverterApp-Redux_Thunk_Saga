import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    conversionUpdated: (conversions, action) => {
      const index = conversions.conversions.findIndex(
        (conversion) => conversion.id === action.id
      );
      conversions.conversions[index] = action.payload;
    },
    conversionRemoved: (conversions, action) => {
      const index = conversions.conversions.findIndex(
        (conversion) => conversion.id === action.id
      );
      conversions.conversions.splice(index, 1);
    },
  },
});

console.log(slice);

export const {
  conversionAdded,
  conversionsLoaded,
  conversionLoaded,
  conversionUpdated,
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

export const addConversion = (component) => async (dispatch) => {
  await axios
    .post("http://localhost:5000/conversions/", component)
    .then((res) => {
      dispatch({
        type: slice.actions.conversionAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateConversion = (id, component) => async (dispatch) => {
  await axios
    .put(`http://localhost:5000/conversions/${id}/`, component)
    .then((res) => {
      dispatch({
        type: slice.actions.conversionUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteConversion = (id) => async (dispatch) => {
  await axios
    .delete(`http://localhost:5000/conversions/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.conversionRemoved.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};
