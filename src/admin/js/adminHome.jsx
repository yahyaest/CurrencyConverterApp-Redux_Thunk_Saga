import React from "react";
import AdminNavbar from "./adminNavbar";
import "../css/admin.css";
import CurrencyTable from "../../components/adminComponents/currencyTable";


function AdminHome(props) {
  return (
    <React.Fragment>
        <AdminNavbar />
        <CurrencyTable data={{name:"currency",url:"http://localhost:5000/currency"}}/>
      <div >
        Cool
      </div>
    </React.Fragment>
  );
}

export default AdminHome;
