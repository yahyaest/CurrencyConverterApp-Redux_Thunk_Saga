import React, { useEffect } from "react";
import AdminNavbar from "../../admin/js/adminNavbar";
import "../../admin/css/admin.css";
import ListTable from "../../admin/js/ListTable";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

function AdminHome(props) {
  AdminHome.prototype = {
    tables: PropTypes.array.isRequired,
  };

  const { tables } = props;

  return (
    <React.Fragment>
      <AdminNavbar />
      <ListTable
        data={{ name: "currency", url: "http://localhost:5000/currencies" }}
      />
      <ListTable
        data={{ name: "conversion", url: "http://localhost:5000/conversions" }}
      />

      <div>
        {tables.map((table) => (
          <h1>{table.name}</h1>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
});

export default connect(mapStateToProps, {})(AdminHome);
