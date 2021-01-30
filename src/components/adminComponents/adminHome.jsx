import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import store from "../../store";
import AdminPage from "../../admin/js/adminPage";
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
      <AdminPage />

      <ListTable
        data={{
          name: "currencies",
          url: "http://localhost:5000/currencies",
          reduxData: "currencies.currencies",
          store: store,
        }}
        tableAttributes={[
          { title: "id", label: "Id", type: "text" },
          { title: "name", label: "Name", type: "text" },
          { title: "country", label: "Country", type: "text" },
          { title: "type", label: "Type", type: "text" },
          { title: "strength", label: "Strength", type: "text" },
        ]} // Don't forget to implement SELECTOR !!!
        search="country"
        filters={["type", "strength"]}
        elementAdd={addCurrency}
        elementUpdate={updateCurrency}
        elementDelete={deleteCurrency}
      />

      <ListTable
        data={{
          name: "conversions",
          url: "http://localhost:5000/conversions",
          reduxData: "conversions.conversions",
          store: store,
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
