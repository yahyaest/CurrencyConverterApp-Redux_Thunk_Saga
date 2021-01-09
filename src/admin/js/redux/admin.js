import { createSlice } from "@reduxjs/toolkit";

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

export const loadTable = (data) => async (dispatch) => {
    
      dispatch({
        type: slice.actions.tableLoaded.type,
        payload: data
        
      });
   
};

export const addTable = (data, tableAttributes) => async (dispatch) => {
  console.log("data :", {data, tableAttributes});
  dispatch({
    type: slice.actions.tableAdded.type,
    payload: { data, tableAttributes },
  });
};
