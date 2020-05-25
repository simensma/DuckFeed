import React from "react";
import DynamicSelect from "../dynamic-select/DynamicSelect";
import Api from "../../utils/Api";

const foodTypes = Api
  .get("duckfeed/food_type/")
  .then(({ data }) => ({ options: data || []}));

class FoodTypeSelector extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <DynamicSelect
        {...this.props}
        optionsPromise={foodTypes}
        errorMessage="Failed to load food types"
        loadingMessage="Loading food types..."
        defaultOption="Select a food type"
        idProp="id"
        valueProp="id"
      />
    );
  }
}

export default FoodTypeSelector;
