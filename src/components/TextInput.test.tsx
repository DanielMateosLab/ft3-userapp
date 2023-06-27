import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders", async () => {
    render(<TextInput />); 
  });
});
