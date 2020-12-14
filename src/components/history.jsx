import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const History = (props) => {
  History.prototype = {
    conversions: PropTypes.array.isRequired,
  };
  const { conversions } = props;

  return (
    <div>
      {conversions.map((element) => (
        <div key={element.id} className="conversion">
          <h3>Date: {element.date}</h3>
          <h3>From: {element.from}</h3>
          <h3>To: {element.to}</h3>
          <h3>Value: {element.value}</h3>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  conversions: state.conversions.conversions,
});

export default connect(mapStateToProps, {
})(History);
