import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { currencyConverter } from "../services/currencyConvertor";
import { addConversion } from "../redux/conversions";
import { FormControl, InputGroup, Button } from "react-bootstrap";

const Home = (props) => {
  Home.prototype = {
    addConversion: PropTypes.func.isRequired,
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState([]);

  return (
    <div className="home">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setFrom(e.currentTarget.value.toUpperCase())}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setTo(e.currentTarget.value.toUpperCase())}
        />
      </InputGroup>
      <Button
        variant="outline-info"
        onClick={async () => {
          const res = await currencyConverter(from, to);
          setResult(
            res[`${from}_${to}`]?.val
              ? res[`${from}_${to}`]?.val
              : "Enter a valid currency !"
          );
          if (res[`${from}_${to}`]?.val)
            props.addConversion(from, to, res[`${from}_${to}`]?.val);
        }}
      >
        Convert
      </Button>

      <h4>Result : {result}</h4>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addConversion,
})(Home);
