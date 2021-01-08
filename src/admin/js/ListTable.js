import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addTable } from "./redux/admin";
function ListTable(props) {
  ListTable.prototype = {
    addTable: PropTypes.func.isRequired,
  };

  const { addTable, data } = props;
  console.log("props :", props);

  useEffect(() => {
    addTable(data);
  }, []);
  return <div></div>;
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addTable })(ListTable);
