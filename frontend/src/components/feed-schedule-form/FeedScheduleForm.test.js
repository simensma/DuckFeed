import React from "react";
import FeedScheduleForm from "./FeedScheduleForm";
import { render, fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

/**
 * Helper method to verify that FeedScheduleForm does not contain the given error message when rendered
 * @param {string} errorMessage message to verify
 */
async function verifyNoErrorMessage(errorMessage) {
  // Render form + wait for Formik to be properly initialized
  const { queryByText } = render(<FeedScheduleForm />);
  await wait();

  // Verify that errorMessage is not found
  const input = queryByText(errorMessage);
  expect(input).toBeNull();
}

/**
 *
 * @param {string} labelText label of the input group you want to validate
 * @param {*} targetValue value that should cause error if set as value of input
 * @param {*} errorValidationText error validation text for the field to test
 */
async function verifyValueCausesError(
  labelText,
  targetValue,
  errorValidationText
) {
  const { getByText, getByLabelText } = render(<FeedScheduleForm />);

  // Find input to validate
  const input = getByLabelText(labelText);

  // Udpate input to validate with new value
  act(() => {
    fireEvent.change(input, {
      target: {
        value: targetValue,
      },
    });
  });

  await wait();

  // make sure errorValidationText is found
  getByText(errorValidationText);
}

describe("when rendering component", () => {
  describe("date field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Date");
    });

    it("should not show an error message on load", async () => {
      await verifyNoErrorMessage("Please enter a date");
    });

    it("should show error message when empty", async () => {
      await verifyValueCausesError("date", "", "Please enter a date");
    });
  });

  describe("quantity field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Quantity");
    });

    it("should not show an error message on load", async () => {
      await verifyNoErrorMessage("Please enter number of ducks observed");
    });

    it("should show error message when empty", async () => {
      await verifyValueCausesError(
        "Quantity",
        "",
        "Please enter number of ducks observed"
      );
    });
  });

  describe("description field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Description");
    });

    it("should show error message when more than 500 chars", async () => {
      await verifyValueCausesError(
        "Description",
        "t".repeat(501),
        "description must be at most 500 characters"
      );
    });
  });
  
});
