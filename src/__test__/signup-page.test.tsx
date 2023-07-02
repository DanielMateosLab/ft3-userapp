import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import Signup from "@/pages/signup";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response),
);

describe("Signup Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillFormAndSubmit = async () => {
    await userEvent.type(
      screen.getByPlaceholderText("Enter your name"),
      "John",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "jhon@test.com",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your password"),
      "Password123",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Confirm your password"),
      "Password123",
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign Up" }));
  };

  it("should render correctly", () => {
    render(<Signup />);

    expect(
      screen.getByRole("heading", { name: "Sign Up" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Sign Up",
      }),
    ).toBeInTheDocument();
  });

  it("should handle form submission correctly", async () => {
    render(<Signup />);

    await fillFormAndSubmit();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should handle signup error correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Signup error" }),
      } as Response),
    );
    render(<Signup />);

    await fillFormAndSubmit();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Signup error")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
