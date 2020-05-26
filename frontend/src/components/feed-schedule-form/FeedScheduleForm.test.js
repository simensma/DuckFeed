import React from "react";
import FeedScheduleForm from "./FeedScheduleForm";
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  cleanup,
  getByText,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

/**
 * Mock FoodTypeSelector and CountrySelector as they have got their own tests.
 */
jest.mock("../food-type-selector/FoodTypeSelector", () => ({
  __esModule: true,
  default: () => "<div></div>",
}));

jest.mock("../country-selector/CountrySelector", () => ({
  __esModule: true,
  default: () => "<div></div>",
}));

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
  errorValidationText,
  fromValue
) {
  const { getByText, getByLabelText } = render(<FeedScheduleForm />);

  // Find input to validate
  const input = getByLabelText(labelText);

  if (fromValue !== undefined) {
    fireEvent.change(input, {
      target: {
        value: fromValue,
      },
    });
  }

  // Udpate input to validate with new value
  fireEvent.change(input, {
    target: {
      value: targetValue,
    },
  });

  await wait();
  getByText(errorValidationText);
}
describe("when rendering component", () => {
  afterEach(cleanup);

  describe("date field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Date");
    });

    it("should not show an error message on load", async () => {
      await verifyNoErrorMessage("Please enter a date");
    });

    it("should show error message when empty", async () => {
      await verifyValueCausesError("Date", "", "Please enter a date");
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

  describe("City input field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("City");
    });

    it("should not show an error message on load", async () => {
      await verifyNoErrorMessage("Please enter a city");
    });

    it("should show error message when empty", async () => {
      await verifyValueCausesError(
        "City",
        "",
        "Please enter a city",
        "This is an initial value"
      );
    });
  });

  describe("Park field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Park");
    });

    it("should not show an error message on load", async () => {
      await verifyNoErrorMessage("Please enter a park");
    });

    it("should show error message when empty", async () => {
      await verifyValueCausesError(
        "Park",
        "",
        "Please enter a park",
        "This is an initial value"
      );
    });
  });
});
