import React from "react";
import * as yup from "yup";
import { Form, Col, Button } from "react-bootstrap";
import { Formik } from "formik";

const feedSchema = yup.object().shape({
  eventDate: yup.date().required('Please enter a date'),
});

const initialValues = {
  eventDate: new Date(),
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
                <Form.Control.Feedback type="invalid">{errors.eventDate}</Form.Control.Feedback>
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
