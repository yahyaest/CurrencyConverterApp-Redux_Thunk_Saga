import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadTable, createButtonShowed } from "./redux/admin";

function AdminDashboard(props) {
  AdminDashboard.prototype = {
    tables: PropTypes.array.isRequired,
    loadTable: PropTypes.func.isRequired,
    createButtonShowed: PropTypes.func.isRequired,
  };

  const { tables, loadTable, createButtonShowed } = props;
  let history = useHistory();

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
                  createButtonShowed();
                  history.push(`/admin/${currentTableData.data.name}`);
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

export default connect(mapStateToProps, { loadTable, createButtonShowed })(
  AdminDashboard
);
