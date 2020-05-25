import React from "react";
import { Form } from "react-bootstrap";

class DynamicSelect extends React.Component {
  constructor() {
    super();

    this.state = { options: [], loading: true };
  }

  componentDidMount() {
    this.props.optionsPromise
        .then(({ options }) => this.setState({ options, loading: false }))
        .catch(() => this.setState({ loading: false, error: true }));
  }

  render() {
    let {
      optionsPromise,
      defaultOption,
      loadingMessage,
      errorMessage,
      ...props
    } = this.props;

    return (
      <>
        {this.state.loading ? (
          loadingMessage || "Loading..."
        ) : this.state.error ? (
          errorMessage || "Failed to load."
        ) : (
          <Form.Control as="select" {...props}>
            <option value="null">{defaultOption}</option>

            {(this.state.options || []).map((type) => (
              <option key={type.name}>{type.name}</option>
            ))}
          </Form.Control>
        )}
      </>
    );
  }
}

export default DynamicSelect;
