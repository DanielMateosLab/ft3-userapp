import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppLink from "./AppLink";

describe("AppLink", () => {
  it("should render correctly", () => {
    render(<AppLink href="/test" text="Test" />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should add additional classes", () => {
    render(<AppLink href="/test" text="Test" className="test-class" />);

    expect(screen.getByText("Test")).toHaveClass("test-class");
  });
});
