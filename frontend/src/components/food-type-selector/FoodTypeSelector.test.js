import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import { render, wait } from "@testing-library/react";

import FoodTypeSelector from "./FoodTypeSelector";

let AxiosMock;

describe("FoodTypeSelector", () => {
  it("should show loading indicator when loading", async () => {
    const { getByText } = render(<FoodTypeSelector />);

    getByText("Loading Food Types...");
  });

  describe("when failed to load", () => {
    beforeEach(() => {
      AxiosMock = new MockAdapter(axios);

      AxiosMock.onGet("/food-types").reply(400, { results: [] });
    });

    it("should show error message", async () => {
      const { getByText } = render(<FoodTypeSelector />);
      await wait();
      getByText("Failed to load food types.");
    });
  });

  describe("when loading succeeded", () => {
    beforeEach(() => {
      AxiosMock = new MockAdapter(axios);

      AxiosMock.onGet("/food-types").reply(200, {
        results: [{ name: "Test-opt-Apple" }, { name: "Test-opt-Pear" }],
      });
    });

    it("Should display retrieved options", async () => {
      const { getByText } = render(<FoodTypeSelector />);
      await wait();
      getByText("Test-opt-Apple");
      getByText("Test-opt-Pear");
    });
  });

  afterEach(() => {
    AxiosMock && AxiosMock.restore();
  });
});
