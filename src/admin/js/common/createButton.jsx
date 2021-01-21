import React from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "react-bootstrap";

function CreateButton(props) {
  CreateButton.prototype = {
    currentTable: PropTypes.object.isRequired,
    createButton: PropTypes.bool.isRequired,
  };

  const { currentTable, createButton } = props;
  let history = useHistory();

  return (
    <div>
      {createButton && (
        <Button
          style={{ marginLeft: "500px", marginTop: "100px" }}
          onClick={() => history.push(`/admin/${currentTable?.data?.name}/new`)}
        >
          Add new
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
  createButton: state.admin.tableStates?.createButton,
});

export default connect(mapStateToProps, {})(CreateButton);
