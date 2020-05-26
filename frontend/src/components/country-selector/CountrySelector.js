import React from "react";
import DynamicSelect from "../dynamic-select/DynamicSelect";
import Api from "../../utils/Api";

const foodTypes = Api.get("duckfeed/country/").then(({ data }) => ({
  options: data || [],
}));

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
