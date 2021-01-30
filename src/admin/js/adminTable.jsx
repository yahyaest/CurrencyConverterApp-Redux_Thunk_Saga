import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

function AdminTable(props) {
  AdminTable.prototype = {
    currentTable: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  const { currentTable, store, onSort, renderSortIcon, modelData } = props;

  const handleDelete = (id) => {
    currentTable.elementDelete(id);
  };

  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        size="sm"
        responsive="md"
        className="admin__table"
        style={{ width: "60%", margin: "0 auto" }}
      >
        <thead>
          <tr>
            {currentTable?.tableAttributes?.map((column) => (
              <th
                key={column.title}
                onClick={() => onSort(column.title)}
                style={{ cursor: "pointer" }}
              >
                {column.title}
                {renderSortIcon(column.title)}
              </th>
            ))}
            {store?.getState()[`${currentTable?.data?.name}`] && (
              <th>update</th>
            )}
            {store?.getState()[`${currentTable?.data?.name}`] && (
              <th>delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {modelData?.map((element) => (
            <tr key={element.id}>
              {currentTable?.tableAttributes?.map((column) => (
                <td key={column.title}>{element[`${column.title}`]}</td>
              ))}
              <td>
                <Link
                  to={`/admin/${currentTable?.data?.name}/${element.id}/`}
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
  store: state.admin.currentTable.data?.store,
});

export default connect(mapStateToProps, {})(AdminTable);
