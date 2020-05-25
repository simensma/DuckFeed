import React from "react";
import axios from "axios";
import DynamicSelect from "../dynamic-select/DynamicSelect";

const foodTypes = axios
  .get("http://localhost:8000/duckfeed/country/")
  .then(({ data }) => ({ options: data || []}));

class CountrySelector extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <DynamicSelect
        {...this.props}
        optionsPromise={foodTypes}
        errorMessage="Failed to load countries"
        loadingMessage="Loading countries..."
        defaultOption="Select a country"
        idProp="code"
        valueProp="code"
      />
    );
  }
}

export default CountrySelector;
