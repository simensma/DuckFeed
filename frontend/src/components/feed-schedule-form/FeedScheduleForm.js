import React from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import FoodTypeSelector from "../food-type-selector/FoodTypeSelector";
import CountrySelector from "../country-selector/CountrySelector";
import Api from "../../utils/Api";
import { feedSchema, feedInitialValues } from "./feedSchema";

/**
 * Component for submission of feed entries.
 */
class FeedScheduleForm extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(data, { resetForm, setSubmitting, setErrors, setStatus }) {
    this.setState({ submitting: true });

    try {
      await Api.post("duckfeed/entry/", data);
      resetForm({});
      setStatus({ success: true });
    } catch (e) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({
        submit: e.message || "Something went wrong when submitting entry",
      });
    }
  }

  render() {
    return (
      <Formik
        validationSchema={feedSchema}
        onSubmit={this.submitForm}
        initialValues={feedInitialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          status,
          submitting,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime"
                  placeholder="Date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.date}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Col md="6">
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="foodType">
                    <Form.Label>Food Type</Form.Label>
                    <FoodTypeSelector
                      name="foodType"
                      value={values.foodType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.foodType}
                    ></FoodTypeSelector>
                    <Form.Control.Feedback type="invalid">
                      {errors.foodType}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.quantity}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col md="6">
                <Form.Group as={Col} md="12" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows="5"
                    placeholder="Enter a description of your feeding"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.description}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="country">
                <Form.Label>Country</Form.Label>
                <CountrySelector
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.country}
                ></CountrySelector>
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  placeholder="Enter a city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.city}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="parkInput">
                <Form.Label>Park</Form.Label>
                <Form.Control
                  type="text"
                  name="park"
                  placeholder="Park"
                  value={values.park}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.park}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.park}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="enableSchedule">
                <Form.Check
                  name="enableSchedule"
                  type="checkbox"
                  label="Repeat event"
                  onChange={handleChange}
                />

                {values.enableSchedule && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Every </span>
                    <Form.Control
                      style={{ margin: "0 4px" }}
                      type="number"
                      name="schedule.days"
                      value={values.schedule.days}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.days}
                    ></Form.Control>
                    <span> days</span>
                  </div>
                )}
              </Form.Group>
            </Form.Row>

            {status && status.success && (
              <Alert variant="success">Entry successfully submitted!</Alert>
            )}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form.Row>
              <Button type="submit" disabled={submitting}>
                Submit entry
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default FeedScheduleForm;
