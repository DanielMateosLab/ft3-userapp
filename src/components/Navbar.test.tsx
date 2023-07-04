import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { render } from "@/utils/testUtils";

jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/login" }),
}));

const mockLogout = jest.fn();
jest.mock("../services/authentication", () => ({
  useLogout: () => ({ logout: mockLogout, loading: false }),
}));

describe("Navbar", () => {
  const user = { id: 1, username: "TestUser", email: "" };

  it("shows the home link", () => {
    render(<Navbar />, { initialValues: { user } });

    expect(screen.getByRole("link", { name: "My App" })).toBeInTheDocument();
  });

  it("shows the dashboard link when authenticated", () => {
    render(<Navbar />, { initialValues: { user } });

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("shows the login link when unauthenticated", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });

  it("shows the register link when unauthenticated", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Register" })).toBeInTheDocument();
  });

  it("shows the logout button when authenticated", () => {
    render(<Navbar />, { initialValues: { user } });

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("handles logout correctly", async () => {
    render(<Navbar />, { initialValues: { user } });

    await userEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("adds the font-bold class to the active link", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Login" })).toHaveClass(
      "font-bold",
    );
  });
});
