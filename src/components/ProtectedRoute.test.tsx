import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProtectedRoute from "./ProtectedRoute";
import { render } from "@/utils/testUtils";
import { UserWithoutPassword } from "@/types/user";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("ProtectedRoute", () => {
  it("renders the given children if a user is logged in", () => {
    const mockText = "Hello, world!";
    render(
      <ProtectedRoute>
        <span>{mockText}</span>
      </ProtectedRoute>,
      {
        initialValues: { user: { id: 1 } as UserWithoutPassword },
      },
    );

    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("shows a warning page if a user is not logged in", () => {
    const mockText = "Hello, world!";
    render(
      <ProtectedRoute>
        <span>{mockText}</span>
      </ProtectedRoute>,
      {
        initialValues: { user: undefined },
      },
    );

    expect(
      screen.getByText("Wait a minute, you are not logged in!"),
    ).toBeInTheDocument();
    const warningTextElement = screen.getByText("Please,", { exact: false });
    expect(warningTextElement).toHaveTextContent(
      "Please, login or sign up to continue.",
    );
    expect(screen.queryByText(mockText)).not.toBeInTheDocument();
  });

  it("should have a link to login page when user is not authenticated", async () => {
    render(<ProtectedRoute />, {
      initialValues: { user: undefined },
    });

    const loginLink = screen.getByRole("link", { name: "login" });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("should have a link to signup page when user is not authenticated", async () => {
    render(<ProtectedRoute />, {
      initialValues: { user: undefined },
    });

    const signupLink = screen.getByRole("link", { name: "sign up" });

    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
