import React, { Suspense } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

class FoodTypeSelector extends React.Component {
  constructor() {
    super();

    this.state = { foodTypes: [], loading: true };
  }

  componentDidMount() {
    axios
      .get("/food-types")
      .then(({ data }) =>
        this.setState({ foodTypes: data.results, loading: false })
      )
      .catch(() => this.setState({ loading: false, error: true }));
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          "Loading Food Types..."
        ) : this.state.error ? (
          "Failed to load food types."
        ) : (
          <Form.Control as="select" {...this.props}>
            <option value="null">Select a food type...</option>

            {(this.state.foodTypes || []).map((type) => (
              <option key={type.name}>{type.name}</option>
            ))}
          </Form.Control>
        )}
      </>
    );
  }
}

export default FoodTypeSelector;
