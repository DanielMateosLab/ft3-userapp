import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/utils/testUtils";
import { unexpectedErrorMessage } from "@/utils/constants";
import Login from "@/pages/login";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockFetch = jest.fn();
jest.mock("../services/fetch", () => ({
  useFetch: () => ({ appPostFetch: mockFetch }),
}));

describe("Login Page", () => {
  const userToLogin = {
    email: "jhon@test.com",
    password: "Password123",
  };

  const fillFormAndSubmit = async () => {
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      userToLogin.email,
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your password"),
      userToLogin.password,
    );
    await userEvent.click(screen.getByRole("button", { name: "Login" }));
  };

  it("should render correctly", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should handle form submission correctly", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => true,
    } as Response);
    render(<Login />);

    await fillFormAndSubmit();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("/api/login", userToLogin);
  });

  it("should handle successful login correctly", async () => {
    const mockUser = { id: 1 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ user: mockUser }),
    } as Response);
    const { mockSetUser } = render(<Login />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
  });

  it("should handle specific login error correctly", async () => {
    const mockErrorMessage = "Invalid credentials";
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: mockErrorMessage }),
    } as Response);
    render(<Login />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it("should handle unexpected login error correctly", async () => {
    mockFetch.mockRejectedValue(new Error());
    render(<Login />);

    await fillFormAndSubmit();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(unexpectedErrorMessage)).toBeInTheDocument();
  });
});
