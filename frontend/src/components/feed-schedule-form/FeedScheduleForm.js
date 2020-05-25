import React from "react";
import * as yup from "yup";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import FoodTypeSelector from "../food-type-selector/FoodTypeSelector";
import CountrySelector from "../country-selector/CountrySelector";
import axios from "axios";

const feedSchema = yup.object().shape({
  date: yup.date().required("Please enter a date"),
  foodType: yup.string().required("Please select a food type"),
  quantity: yup
    .number()
    .required("Please enter number of ducks observed")
    .min(0)
    .max(1000),
  description: yup.string().max(500),
  city: yup.string().required("Please enter a city"),
  park: yup.string().required("Please enter a park"),
});

const initialValues = {
  date: new Date(),
  quantity: 1,
  description: "",
  city: "",
  park: "",
};

class FeedScheduleForm extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(data, {resetForm, setSubmitting, setErrors, setStatus}) {
    this.setState({submitting: true});

    try {
      await axios.post('http://localhost:8000/duckfeed/entry/', data)
      resetForm({});
      setStatus({success: true});
    } catch(e) {
      setStatus({success: false});
      setSubmitting(false);
      setErrors({submit: e.message || 'Something went wrong when submitting entry'});
    }
  }

  render() {
    return (
      <Formik
        validationSchema={feedSchema}
        onSubmit={this.submitForm}
        initialValues={initialValues}
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
            {}
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime"
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
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.city}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="park">
                <Form.Label>Park</Form.Label>
                <Form.Control
                  type="text"
                  name="park"
                  value={values.park}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.park}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.park}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            {status && status.success && (
              <Alert variant="success">Entry successfully submitted!</Alert>
            )}
            {errors.submit && (
              <Alert variant="danger">{errors.submit}</Alert>
            )}
            
            <Form.Row>
              <Button type="submit" disabled={submitting}>Submit entry</Button>
            </Form.Row>
            
          </Form>
        )}
      </Formik>
    );
  }
}

export default FeedScheduleForm;
