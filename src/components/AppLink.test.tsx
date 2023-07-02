import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AppLink from "./AppLink";

describe("AppLink", () => {
  it("renders", async () => {
    render(<AppLink />); 
  });
});
