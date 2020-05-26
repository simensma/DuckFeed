import React from "react";
import { Form } from "react-bootstrap";

/**
 * Component to render a select Form.Control with options given by a promise.
 *
 * Example:
 * <DynamicSelect
 *  optionsPromise={this.loadFromApi}
 *  loadingMessage="Loading.."
 *  errorMessage="Failed to load"
 *  idProp="id"
 *  valueProp="value">
 */
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
      idProp,
      valueProp,
      ...props
    } = this.props;

    return (
      <>
        {this.state.loading ? (
          <p>{loadingMessage || "Loading..."}</p>
        ) : this.state.error ? (
          <p>{errorMessage || "Failed to load."}</p>
        ) : (
          <Form.Control as="select" {...props}>
            <option value="null">{defaultOption}</option>

            {(this.state.options || []).map((type) => (
              <option
                key={type[idProp] || type.name}
                value={type[valueProp] || type.name}
              >
                {type.name}
              </option>
            ))}
          </Form.Control>
        )}
      </>
    );
  }
}

export default DynamicSelect;
