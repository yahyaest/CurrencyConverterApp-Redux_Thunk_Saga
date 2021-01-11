import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

function AdminNavbar(props) {
  AdminNavbar.prototype = {
    currentTable: PropTypes.object.isRequired,
  };
  const { currentTable } = props;
  return (
    <React.Fragment>
      <nav>
        <div className="admin__navbar">
          <i className="fa fa-list-ul"></i>
          <ul>
            <li>{currentTable.data?.name}</li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminNavbar);
