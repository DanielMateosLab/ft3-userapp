import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "@/pages/signup";
import { render } from "@/utils/testUtils";
import { unexpectedErrorMessage } from "@/utils/constants";
import { UserWithoutPassword } from "@/types/user";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockFetch = jest.fn();
jest.mock("../services/fetch", () => ({
  useFetch: () => ({ appPostFetch: mockFetch }),
}));

describe("Signup Page", () => {
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
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 1 } }),
    } as Response);
    render(<Signup />);

    await fillFormAndSubmit();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("/api/signup", expect.anything());
  });

  it("should handle successful signup correctly", async () => {
    const mockUser = { id: 1 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ user: mockUser }),
    } as Response);
    const { mockSetUser } = render(<Signup />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
  });

  it("should handle specific signup error correctly", async () => {
    const errorMessage = "Email already exists";
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: errorMessage }),
    } as Response);
    render(<Signup />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should handle unexpected signup error correctly", async () => {
    mockFetch.mockRejectedValue({});
    render(<Signup />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText(unexpectedErrorMessage)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should redirect to dashboard if user is already authenticated", () => {
    render(<Signup />, {
      initialValues: {
        user: { id: 1 } as UserWithoutPassword,
      },
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
