import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  getConversions,
  currencyConverter,
  getCurrencies,
} from "../services/currencyConvertor";
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
            let db = await getConversions();
            let length = db.length;
            let body = {};
            body.id = length + 1;
            body.date = new Date(Date.now());
            body.from = from;
            body.to = to;
            body.value = res[`${from}_${to}`]?.val;
            setResult(
              res[`${from}_${to}`]?.val
                ? res[`${from}_${to}`]?.val
                : "Enter a valid currency !"
            );
            if (res[`${from}_${to}`]?.val) props.addConversion(body);
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
        <Button
          variant="outline-info"
          onClick={async () => {
            let db = await getCurrencies();
            let length = db.length;
            let body = {};
            body.id = length + 1;
            body.country = country;
            body.name = currency;
            props.addCurrency(body);
          }}
        >
          Add Currency
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addConversion,
  addCurrency,
})(Home);
