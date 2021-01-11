import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AdminNavbar from "../../admin/js/adminNavbar";
import AdminDashboard from "./../../admin/js/adminDashboard";
import AdminTable from "./../../admin/js/adminTable";
import ListTable from "../../admin/js/ListTable";
import { deleteCurrency } from "../../redux/currencies";
import { deleteConversion } from "../../redux/conversions";
import "../../admin/css/admin.css";

function AdminHome(props) {
  AdminHome.prototype = {
    tables: PropTypes.array.isRequired,
    deleteCurrency: PropTypes.func.isRequired,
    deleteConversion: PropTypes.func.isRequired,
  };

  const { tables, deleteCurrency, deleteConversion } = props;

  return (
    <React.Fragment>
      <AdminNavbar />
      <AdminDashboard />
      <AdminTable />

      <ListTable
        data={{ name: "currencies", url: "http://localhost:5000/currencies" }}
        tableAttributes={[
          { title: "id", label: "Id" },
          { title: "name", label: "Name" },
          { title: "country", label: "Country" },
        ]}
        elementDelete={deleteCurrency}
      />

      <ListTable
        data={{ name: "conversions", url: "http://localhost:5000/conversions" }}
        tableAttributes={[
          { title: "id", label: "Id" },
          { title: "date", label: "Date" },
          { title: "from", label: "From" },
          { title: "to", label: "To" },
          { title: "value", label: "Value" },
        ]}
        elementDelete={deleteConversion}
      />

      <div style={{ width: "60%", margin: "0 auto", textAlign: "center" }}>
        {tables.map((table) => (
          <h1 key={table.data.name}>{table.data.name}</h1>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
});

export default connect(mapStateToProps, { deleteCurrency, deleteConversion })(
  AdminHome
);
