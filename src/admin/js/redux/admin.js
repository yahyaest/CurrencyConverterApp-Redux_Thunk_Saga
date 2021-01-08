import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "admin",
  initialState: { tables: [], currentTable: {} },
  reducers: {
    tableAdded: (tables, action) => {
      tables.tables.push(action.payload);
    },
    tablesLoaded: (tables, action) => {
      tables.tables = action.payload;
    },
    tableLoaded: (tables, action) => {
      tables.currentTable = action.payload;
    },
    tableRemoved: (tables, action) => {
      const index = tables.findIndex((table) => table.id === action.id);
      tables.splice(index, 1);
    },
  },
});

console.log(slice);

export const {
  tableAdded,
  tablesLoaded,
  tableLoaded,
  tableRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadTables = (data) => async (dispatch) => {
  
      dispatch({
        type: slice.actions.tablesLoaded.type,
        payload: data,
      });
  
};

export const loadTable = (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/conversions/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.tableLoaded.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const addTable = (data) => async (dispatch) => {
  console.log("data :", data);
  dispatch({
    type: slice.actions.tableAdded.type,
    payload: data,
  });
};
