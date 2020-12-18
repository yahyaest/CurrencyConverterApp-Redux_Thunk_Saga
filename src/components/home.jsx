import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { currencyConverter } from "../services/currencyConvertor";
import { addConversion } from "../redux/conversions";
import { addCurrency } from "../redux/currencies";
import { FormControl, InputGroup, Button } from "react-bootstrap";

const Home = (props) => {
  Home.prototype = {
    addConversion: PropTypes.func.isRequired,
    addCurrency: PropTypes.func.isRequired,

  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState([]);

  return (
    <div className="home">
      <div className="conversion__form">
        <h1>Conversion</h1>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="..."
            aria-label="..."
            aria-describedby="basic-addon1"
            onChange={(e) => setFrom(e.currentTarget.value.toUpperCase())}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="..."
            aria-label="..."
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
      <div className="currency__form">
        <h1>Currency</h1>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Country</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="..."
            aria-label="..."
            aria-describedby="basic-addon1"
            onChange={(e) => setCountry(e.currentTarget.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Currency</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="..."
            aria-label="..."
            aria-describedby="basic-addon1"
            onChange={(e) => setCurrency(e.currentTarget.value.toUpperCase())}
          />
        </InputGroup>
        <Button variant="outline-info" onClick={async () => {props.addCurrency(country,currency)}}>
          Add Currency
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addConversion,addCurrency
})(Home);