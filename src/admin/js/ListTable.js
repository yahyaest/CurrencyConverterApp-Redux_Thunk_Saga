import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addTable } from "./redux/admin";
function ListTable(props) {
  ListTable.prototype = {
    tables: PropTypes.array.isRequired,
    addTable: PropTypes.func.isRequired,
  };

  const { tables, addTable, data, tableAttributes,elementAdd,elementUpdate, elementDelete } = props;

  const tableExist = (tableName) => {
    const tableIndex = tables.findIndex((table) => table.data.name === tableName);
    return tableIndex;
  };

  useEffect(() => {
  if (tableExist(data.name) === -1) addTable(data, tableAttributes,elementAdd,elementUpdate, elementDelete);
  }, []);
  return <div></div>;
}

const mapStateToProps = (state) => ({ tables: state.admin.tables });

export default connect(mapStateToProps, { addTable })(ListTable);
