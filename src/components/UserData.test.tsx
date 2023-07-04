import { render } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import UserData from "./UserData";

describe("UserData", () => {
  it("should render the username", () => {
    const user = {
      username: "JhonDoe_1985",
      email: "jhondoe_test@test.com",
    };

    render(<UserData user={user} />);
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText(user.username)).toBeInTheDocument();
  });

  it("should render the email", () => {
    const user = {
      username: "JhonDoe_1985",
      email: "jhondoe_test@test.com",
    };

    render(<UserData user={user} />);
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it("should render the profile picture placeholder", () => {
    const user = { username: "", email: "" };

    render(<UserData user={user} />);

    expect(
      screen.getByTitle("Profile picture placeholder"),
    ).toBeInTheDocument();
  });
});
