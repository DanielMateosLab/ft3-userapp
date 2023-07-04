import type { Meta, StoryObj } from "@storybook/react";
import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "@/services/user";

const meta = {
  title: "Components/ProtectedRoute",
  component: ProtectedRoute,
} satisfies Meta<typeof ProtectedRoute>;

export default meta;

type Story = StoryObj<typeof ProtectedRoute>;

export const Unauthenticated: Story = {
  args: { children: <div>Test screen</div> },
  decorators: [
    (Story) => (
      <UserContext.Provider value={{ user: undefined, setUser: () => {} }}>
        <Story />
      </UserContext.Provider>
    ),
  ],
};

export const Authenticated: Story = {
  args: { ...Unauthenticated.args },
  decorators: [
    (Story) => (
      <UserContext.Provider
        value={{ user: { id: 1 } as any, setUser: () => {} }}
      >
        <Story />
      </UserContext.Provider>
    ),
  ],
};
