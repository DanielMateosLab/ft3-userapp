import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders a label and an input", () => {
    render(<TextInput name="test" label="Test" />);

    expect(screen.getByLabelText("Test")).toBeInTheDocument();
    expect(screen.getByLabelText("Test")).toHaveAttribute("type", "text");
  });

  it("has type text by default", () => {
    render(<TextInput name="test" label="Test" />);

    expect(screen.getByLabelText("Test")).toHaveAttribute("type", "text");
  });

  it("can have a different type", () => {
    render(<TextInput name="test" label="Test" type="password" />);

    expect(screen.getByLabelText("Test")).toHaveAttribute("type", "password");
  });

  it("can have a placeholder", () => {
    render(<TextInput name="test" label="Test" placeholder="Type here" />);

    expect(screen.getByLabelText("Test")).toHaveAttribute(
      "placeholder",
      "Type here",
    );
  });

  it("calls onChange when the value changes", async () => {
    const onChange = jest.fn();
    render(<TextInput name="test" label="Test" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("Test"), "Hello");

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it("has the value passed in", () => {
    render(
      <TextInput name="test" label="Test" value="Hello" onChange={() => {}} />,
    );

    expect(screen.getByLabelText("Test")).toHaveValue("Hello");
  });
});
