import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addTable } from "../../admin/js/redux/admin";
function CurrencyTable(props) {
  CurrencyTable.prototype = {
    tables: PropTypes.array.isRequired,
    addTable: PropTypes.func.isRequired,
  };
  console.log("props :", props);

  props.addTable(props.data);
  return <div></div>;
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
});

export default connect(mapStateToProps, { addTable })(CurrencyTable);
