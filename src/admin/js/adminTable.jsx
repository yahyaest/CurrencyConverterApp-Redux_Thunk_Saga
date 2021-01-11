import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

import store from "./../../store";

function AdminTable(props) {
  AdminTable.prototype = {
    currentTable: PropTypes.object.isRequired,
  };

  const { currentTable } = props;

  const getCurrentTableName = () => {
    if (store.getState()[`${currentTable.data?.name}`]) {
      return store.getState()[`${currentTable.data?.name}`][
        `${currentTable.data?.name}`
      ];
    } else return [];
  };

  const handleDelete = (id) => {
    currentTable.elementDelete(id);
  };

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <Table striped bordered hover variant="dark" size="sm" responsive="md">
        <thead>
          <tr>
            {currentTable.tableAttributes?.map((column) => (
              <th key={column.title}>{column.title}</th>
            ))}
            {store.getState()[`${currentTable.data?.name}`] && <th>update</th>}{" "}
            {store.getState()[`${currentTable.data?.name}`] && <th>delete</th>}
          </tr>
        </thead>
        <tbody>
          {getCurrentTableName()?.map((element) => (
            <tr key={element.id}>
              {currentTable.tableAttributes?.map((column) => (
                <td key={column.title}>{element[`${column.title}`]}</td>
              ))}
              <td>
                <Link
                  to={`/admin/${currentTable.data?.name}/${element.id}/`}
                  className="btn btn-warning btn-sm"
                >
                  Update
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminTable);
