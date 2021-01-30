import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import _ from "lodash";
import AdminNavbar from "./adminNavbar";
import AdminDashboard from "./adminDashboard";
import AdminTable from "./adminTable";
import AdminMenu from "./adminMenu";
import Pagination from "./common/pagination";

function AdminPage(props) {
  AdminPage.prototype = {
    currentTable: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  const { currentTable, store } = props;
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("Filters");
  const [currentOption, setCurrentOption] = useState("Options");

  const pageSize = 10;

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchQuery(e.currentTarget.value);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };
  const handleOption = (option) => {
    setCurrentOption(option);
  };

  const getFilterOptions = (currentFilter) => {
    let filterOptions = ["Options"];
    let result = [];
    if (store?.getState()[`${currentTable?.data?.name}`]) {
      const keys = currentTable?.data?.reduxData.split(".");
      result = store?.getState();
      keys.forEach((key) => {
        result = result[`${key}`];
      });
    }

    result.map((element) => {
      if (currentFilter !== "Filters") {
        let index = filterOptions.indexOf(element[`${currentFilter}`]);
        if (index === -1) filterOptions.push(element[`${currentFilter}`]);
      }
    });

    return filterOptions;
  };

  const renderSortIcon = (sortType) => {
    if (sortType !== sortBy) return null;
    if (sortOrder === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  const onSort = (sortType) => {
    setSortBy(sortType);
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    setCurrentPage(1);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCurrentTableData = (sortType) => {
    if (store?.getState()[`${currentTable?.data?.name}`]) {
      const keys = currentTable?.data?.reduxData.split(".");
      let result = store?.getState();
      keys.forEach((key) => {
        result = result[`${key}`];
      });
      // 1-filter
      let data = [];
      if (searchQuery && currentTable?.search)
        data = result.filter((element) =>
          element[`${currentTable?.search}`]
            ?.toLowerCase()
            .startsWith(searchQuery.toLowerCase())
        );
      else if (currentOption === "Options" || !currentTable?.filters)
        data = result;
      else
        data = result.filter(
          (element) => element[`${currentFilter}`] === currentOption
        );
      // 2-sort
      const sorted = _.orderBy(data, sortType, sortOrder);
      // 3-paginate
      const modelData = paginate(sorted, currentPage, pageSize);
      const count =
        currentOption === "Options" && !searchQuery
          ? result.length
          : data.length;
      return {
        modelData,
        count,
      };
    } else return [];
  };

  const { modelData, count } = getCurrentTableData(sortBy);

  return (
    <div>
      <AdminNavbar handleSearch={handleSearch} />
      <AdminDashboard />
      <AdminMenu
        filters={currentTable?.filters}
        currentFilter={currentFilter}
        handleFilter={handleFilter}
        currentOption={currentOption}
        handleOption={handleOption}
        filterOptions={getFilterOptions}
      />
      <AdminTable
        onSort={onSort}
        renderSortIcon={renderSortIcon}
        modelData={modelData}
      />
      <Pagination
        itemsCounts={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
  store: state.admin.currentTable.data?.store,
});

export default connect(mapStateToProps, {})(AdminPage);
