import axios from "axios";

import React from "react";
import FeedScheduleForm from "./FeedScheduleForm";
import { render, fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import MockAdapter from "axios-mock-adapter";

describe("when rendering component", () => {
  describe("date field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Date");
    });

    it("should not show an error message on load", async () => {
      const { queryByText } = render(<FeedScheduleForm />);

      await wait();
      const input = queryByText("Please enter a date");

      expect(input).toBeNull();
    });

    it("should show error message when empty", async () => {
      const { getByText, getByLabelText } = render(<FeedScheduleForm />);
      const input = getByLabelText("Date");

      act(() => {
        fireEvent.change(input, {
          target: {
            value: "",
          },
        });
      });

      await wait();

      getByText("Please enter a date");
    });
  });

  describe("quantity field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Quantity");
    });

    it("should not show an error message on load", async () => {
      const { queryByText } = render(<FeedScheduleForm />);

      await wait();
      const input = queryByText("Please enter number of ducks observed");

      expect(input).toBeNull();
    });

    it("should show error message when empty", async () => {
      const { getByText, getByLabelText } = render(<FeedScheduleForm />);
      const input = getByLabelText("Quantity");

      act(() => {
        fireEvent.change(input, {
          target: {
            value: "",
          },
        });
      });

      await wait();

      getByText("Please enter number of ducks observed");
    });
  });

  describe("description field", () => {
    it("should exist", () => {
      const { getByLabelText } = render(<FeedScheduleForm />);
      getByLabelText("Description");
    });

    it("should show error message when more than 500 chars", async () => {
      const { getByText, getByLabelText } = render(<FeedScheduleForm />);
      const input = getByLabelText("Description");

      act(() => {
        fireEvent.change(input, {
          target: {
            value: "t".repeat(501),
          },
        });
      });

      await wait();

      getByText("description must be at most 500 characters");
    });
  });
});
