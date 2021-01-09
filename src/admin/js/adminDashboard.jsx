import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadTable } from "./redux/admin";

function AdminDashboard(props) {
  AdminDashboard.prototype = {
    tables: PropTypes.array.isRequired,
    loadTable: PropTypes.func.isRequired,
  };

  const { tables, loadTable } = props;

  return (
    <React.Fragment>
      <nav className="slideBar">
        <ul className="slideBar__list">
          {tables.map((table) => (
            <li key={table.data.name} className="slideBar__item">
              <p
                className="title"
                onClick={(e) => {
                  const currentTableData = tables.find(
                    (table) => table.data.name === e.currentTarget.innerText
                  );
                  loadTable(currentTableData);
                }}
              >
                {table.data.name}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
});

export default connect(mapStateToProps, { loadTable })(AdminDashboard);
