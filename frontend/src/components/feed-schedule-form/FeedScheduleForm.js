import React from "react";
import * as yup from "yup";
import { Form, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import FoodTypeSelector from "../food-type-selector/FoodTypeSelector";

const feedSchema = yup.object().shape({
  eventDate: yup.date().required("Please enter a date"),
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
  eventDate: new Date(),
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

  submitForm(data) {
    console.log(data);
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
          dirty,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="eventDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime"
                  name="eventDate"
                  value={values.eventDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.eventDate}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.eventDate}
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
              <Form.Group as={Col} md="4" controlId="countryInput">
                <Form.Label>Country</Form.Label>
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

            <Button type="submit">Submit entry</Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default FeedScheduleForm;
