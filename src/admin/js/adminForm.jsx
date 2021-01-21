import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import store from "./../../store";
import { Form, Button } from "react-bootstrap";
import Input from "./common/input";

function AdminForm(props) {
  AdminForm.prototype = {
    currentTable: PropTypes.object.isRequired,
  };
  const { currentTable } = props;
  const currentId = Number(props.match.params.id);
  const [currentComponent, setCurrentComponent] = useState({});
  const [intialComponent, setIntialComponent] = useState({});

  const setComponent = () => {
    let component = {};
    let attributsList = [];

    currentTable?.tableAttributes?.map((attribute) =>
      attributsList.push(attribute.title)
    );
    if (props.match.url === `/admin/${currentTable.data?.name}/new`) {
      attributsList.map((attribute) => (component[`${attribute}`] = ""));
    } else {
      attributsList.map(
        (attribute) =>
          (component[`${attribute}`] = getInputValue(currentId, attribute))
      );
    }
    return component;
  };

  useEffect(() => {
    setIntialComponent(setComponent());
  }, []);

  let component = intialComponent;

  const getInputValue = (id, attribute) => {
    if (store.getState()[`${currentTable.data?.name}`]) {
      const keys = currentTable.data?.reduxData.split(".");
      let result = store.getState();
      keys.forEach((key) => {
        result = result[`${key}`];
      });
      result = result.filter((element) => element.id == id);
      result = result[0][`${attribute}`];
      return result;
    } else return [];
  };

  const handleChange = (e, attribute) => {
    if (e.target.name === attribute) {
      component[`${attribute}`] = e.currentTarget.value;
      setCurrentComponent(component);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.match.url === `/admin/${currentTable.data.name}/new`) {
      currentTable.elementAdd(currentComponent);
      props.history.push(`/admin/`);
    } else {
      if (Object.keys(currentComponent).length === 0) {
        currentTable.elementUpdate(currentId, intialComponent);
      } else {
        currentTable.elementUpdate(currentId, currentComponent);
      }
      props.history.push(`/admin/`);
    }
  };

  return (
    <Form
      onSubmit={(e) => handleSubmit(e)}
      style={{ width: "60%", margin: "0 auto" }}
    >
      {currentTable?.tableAttributes?.map((attribute) => (
        <Input
          key={attribute.label}
          controlId={`formBasic${attribute.label}`}
          label={attribute.label}
          name={attribute.title}
          type={attribute.type}
          value={
            props.match.url !== `/admin/${currentTable.data?.name}/new`
              ? getInputValue(currentId, attribute.title)
              : ""
          }
          handleChange={(e) => handleChange(e, attribute.title)}
        />
      ))}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminForm);
