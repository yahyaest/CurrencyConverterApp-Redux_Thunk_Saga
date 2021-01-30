import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { InputGroup, FormControl } from "react-bootstrap";

function AdminNavbar(props) {
  AdminNavbar.prototype = {
    currentTable: PropTypes.object.isRequired,
  };
  const { currentTable, handleSearch } = props;

  return (
    <React.Fragment>
      <nav>
        <div className="admin__navbar">
          <i className="fa fa-list-ul"></i>
          <ul>
            <li style={{ listStyleType: "none" }}>
              {currentTable?.data?.name}
            </li>
          </ul>
          <InputGroup
            className="mb-3"
            style={{ width: "40%", margin: "0 50px" }}
          >
            <FormControl
              placeholder={
                currentTable?.data?.name
                  ? `Search ${currentTable?.data?.name}`
                  : ""
              }
              aria-label={
                currentTable?.data?.name
                  ? `Search ${currentTable?.data?.name}`
                  : ""
              }
              aria-describedby="basic-addon2"
              onChange={handleSearch}
            />
            <InputGroup.Append>
              <i
                className="fa fa-search"
                style={{
                  backgroundColor: "gold",
                  color: "crimson",
                  padding: "5px 10px",
                  paddingTop: "10px",
                  cursor: "pointer",
                }}
              ></i>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </nav>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminNavbar);
