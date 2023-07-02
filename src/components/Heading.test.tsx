import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Heading from "./Heading";

describe("Heading", () => {
  it("renders the heading text", () => {
    const text = "Heading text";
    render(<Heading text={text} />);
    expect(screen.getByRole("heading")).toHaveTextContent(text);
  });
});
