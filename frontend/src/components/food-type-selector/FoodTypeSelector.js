import React from "react";
import axios from "axios";
import DynamicSelect from "../dynamic-select/DynamicSelect";

const foodTypes = axios
  .get("http://localhost:8000/duckfeed/food_type/")
  .then(({ data }) => ({ options: data || []}));

class FoodTypeSelector extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <DynamicSelect
        optionsPromise={foodTypes}
        errorMessage="Failed to load food types"
        loadingMessage="Loading food types..."
        defaultOption="Select a food type"
      />
    );
  }
}

export default FoodTypeSelector;
