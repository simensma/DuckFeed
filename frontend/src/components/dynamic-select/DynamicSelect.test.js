import React from "react";
import { render, wait } from "@testing-library/react";

import DynamicSelect from "./DynamicSelect";

const failedRequest = new Promise((resolve, reject) => reject({}));
const resolvedRequest = new Promise((resolve, reject) =>
  resolve({
    options: [{ name: "Test-opt-Apple" }, { name: "Test-opt-Pear" }],
  })
);

describe("DynamicSelect", () => {
  it("should show loading indicator when loading", () => {
    const { getByText } = render(
      <DynamicSelect
        optionsPromise={failedRequest}
        loadingMessage="Loading testdata"
      />
    );

    getByText("Loading testdata");
  });

  describe("when failed to load", () => {
    it("should show error message", async () => {
      const { getByText } = render(
        <DynamicSelect
          optionsPromise={failedRequest}
          errorMessage="Failed to load"
        />
      );
      await wait();
      getByText("Failed to load");
    });
  });

  describe("when loading succeeded", () => {
    it("Should display retrieved options", async () => {
      const { getByText } = render(
        <DynamicSelect optionsPromise={resolvedRequest} />
      );
      await wait();
      getByText("Test-opt-Apple");
      getByText("Test-opt-Pear");
    });
  });
});
