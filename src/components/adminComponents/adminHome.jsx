import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AdminNavbar from "../../admin/js/adminNavbar";
import AdminDashboard from "./../../admin/js/adminDashboard";
import AdminTable from "./../../admin/js/adminTable";
import ListTable from "../../admin/js/ListTable";
import {
  addCurrency,
  updateCurrency,
  deleteCurrency,
} from "../../redux/currencies";
import {
  addConversion,
  updateConversion,
  deleteConversion,
} from "../../redux/conversions";
import "../../admin/css/admin.css";

function AdminHome(props) {
  AdminHome.prototype = {
    addCurrency: PropTypes.func.isRequired,
    updateCurrency: PropTypes.func.isRequired,
    deleteCurrency: PropTypes.func.isRequired,
    addConversion: PropTypes.func.isRequired,
    updateConversion: PropTypes.func.isRequired,
    deleteConversion: PropTypes.func.isRequired,
  };

  const {
    addCurrency,
    updateCurrency,
    deleteCurrency,
    addConversion,
    updateConversion,
    deleteConversion,
  } = props;

  return (
    <React.Fragment>
      <AdminNavbar />
      <AdminDashboard />
      <AdminTable />

      <ListTable
        data={{
          name: "currencies",
          url: "http://localhost:5000/currencies",
          reduxData: "currencies.currencies",
        }}
        tableAttributes={[
          { title: "id", label: "Id", type: "text" },
          { title: "name", label: "Name", type: "text" },
          { title: "country", label: "Country", type: "text" },
        ]}
        elementAdd={addCurrency}
        elementUpdate={updateCurrency}
        elementDelete={deleteCurrency}
      />

      <ListTable
        data={{
          name: "conversions",
          url: "http://localhost:5000/conversions",
          reduxData: "conversions.conversions",
        }}
        tableAttributes={[
          { title: "id", label: "Id", type: "text" },
          { title: "date", label: "Date" },
          { title: "from", label: "From" },
          { title: "to", label: "To" },
          { title: "value", label: "Value" },
        ]}
        elementAdd={addConversion}
        elementUpdate={updateConversion}
        elementDelete={deleteConversion}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addCurrency,
  updateCurrency,
  deleteCurrency,
  addConversion,
  updateConversion,
  deleteConversion,
})(AdminHome);
