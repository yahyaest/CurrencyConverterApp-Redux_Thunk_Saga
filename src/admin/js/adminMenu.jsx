import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "react-bootstrap";
import Selector from "./common/selector";

function AdminMenu(props) {
  AdminMenu.prototype = {
    currentTable: PropTypes.object.isRequired,
    createButton: PropTypes.bool.isRequired,
  };

  const {
    currentTable,
    createButton,
    filterSelector,
    filters,
    currentFilter,
    handleFilter,
    currentOption,
    handleOption,
    filterOptions,
  } = props;
  let history = useHistory();

  return (
    <React.Fragment>
      {createButton && (
        <div className="menu__bar">
          {filterSelector && (
            <Selector
              filters={filterOptions}
              filterType="filterOptions"
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              currentOption={currentOption}
              handleOption={handleOption}
              filterOptions={filterOptions}
            />
          )}
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              history.push(`/admin/${currentTable?.data?.name}/new`)
            }
          >
            Add new
          </Button>
          <Selector
            filters={filters}
            filterType="filterList"
            currentFilter={currentFilter}
            handleFilter={handleFilter}
            currentOption={currentOption}
            handleOption={handleOption}
            filterOptions={filterOptions}
          />
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
  createButton: state.admin.tableStates?.createButton,
  filterSelector: state.admin.tableStates?.filterSelector,
});

export default connect(mapStateToProps, {})(AdminMenu);
