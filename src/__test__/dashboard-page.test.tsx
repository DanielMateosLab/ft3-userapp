import Dashboard from "@/pages/dashboard";
import { UserWithoutPassword } from "@/types/user";
import { render } from "@/utils/testUtils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockLogout = jest.fn();
jest.mock("../services/authentication", () => ({
  useLogout: () => ({ logout: mockLogout, loading: false }),
}));

describe("Dashboard Page", () => {
  it("should show unauthenticated warning page if user is not authenticated", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("heading", {
        name: "Wait a minute, you are not logged in!",
      }),
    ).toBeInTheDocument();
  });

  it("should show dashboard page if user is authenticated", () => {
    const mockUser = { id: 1, username: "TestUser" } as UserWithoutPassword;
    render(<Dashboard />, { initialValues: { user: mockUser } });

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
  });

  it("should have a logout button", async () => {
    const mockUser = { id: 1, username: "TestUser" } as UserWithoutPassword;
    render(<Dashboard />, { initialValues: { user: mockUser } });

    expect(
      screen.getByRole("button", { name: "Disconnect" }),
    ).toBeInTheDocument();
  });

  it("should handle logout correctly", async () => {
    const mockUser = { id: 1, username: "TestUser" } as UserWithoutPassword;
    render(<Dashboard />, { initialValues: { user: mockUser } });

    await userEvent.click(screen.getByRole("button", { name: "Disconnect" }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
