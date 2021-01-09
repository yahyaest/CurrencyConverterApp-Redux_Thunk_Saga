import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AdminNavbar from "../../admin/js/adminNavbar";
import AdminDashboard from "./../../admin/js/adminDashboard";
import ListTable from "../../admin/js/ListTable";
import "../../admin/css/admin.css";

function AdminHome(props) {
  AdminHome.prototype = {
    tables: PropTypes.array.isRequired,
  };

  const { tables } = props;

  return (
    <React.Fragment>
      <AdminNavbar />
      <AdminDashboard />
     
      <ListTable
        data={{ name: "currency", url: "http://localhost:5000/currencies" }}
        tableAttributes={[
          { title: "id", label: "Id" },
          { title: "name", label: "Name" },
          { title: "Country", label: "Country" },
        ]}
      />

      <ListTable
        data={{ name: "conversion", url: "http://localhost:5000/conversions" }}
        tableAttributes={[
          { title: "id", label: "Id" },
          { title: "date", label: "Date" },
          { title: "from", label: "From" },
          { title: "to", label: "To" },
          { title: "value", label: "Value" },
        ]}
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

export default connect(mapStateToProps, {})(AdminHome);
