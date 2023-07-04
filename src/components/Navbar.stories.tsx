import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./Navbar";
import { UserContext } from "@/services/user";
import { UserWithoutPassword } from "@/types/user";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Unauthenticated: Story = {
  args: {},
  decorators: [
    (Story) => (
      <UserContext.Provider value={{ user: undefined, setUser: () => {} }}>
        <Story />
      </UserContext.Provider>
    ),
  ],
};

export const Authenticated: Story = {
  args: {},
  decorators: [
    (Story) => (
      <UserContext.Provider
        value={{ user: { id: 1 } as UserWithoutPassword, setUser: () => {} }}
      >
        <Story />
      </UserContext.Provider>
    ),
  ],
};
