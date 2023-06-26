import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  it("renders the provided text and calls the onClick function when clicked", async () => {
    const mockOnClick = jest.fn();
    const buttonText = "Hello World";
    render(<Button text={buttonText} onClick={mockOnClick} />);

    await userEvent.click(screen.getByText(buttonText));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
