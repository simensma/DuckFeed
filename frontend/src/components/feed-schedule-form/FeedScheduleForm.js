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
});

const initialValues = {
  eventDate: new Date(),
  quantity: 1,
};

class FeedScheduleForm extends React.Component {
  render() {
    return (
      <Formik
        validationSchema={feedSchema}
        onSubmit={console.log}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
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

            <Button type="submit">Submit entry</Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default FeedScheduleForm;
