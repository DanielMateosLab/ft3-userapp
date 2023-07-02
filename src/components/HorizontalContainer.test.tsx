import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HorizontalContainer from "./HorizontalContainer";

describe("HorizontalContainer", () => {
  it("renders children", () => {
    render(
      <HorizontalContainer>
        <div>Test</div>
      </HorizontalContainer>,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
