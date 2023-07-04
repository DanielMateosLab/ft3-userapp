import type { Meta, StoryObj } from "@storybook/react";
import UserData from "./UserData";

const meta = {
  title: "Components/UserData",
  component: UserData,
} satisfies Meta<typeof UserData>;

export default meta;

type Story = StoryObj<typeof UserData>;

export const Primary: Story = {
  args: {
    user: {
      username: "JhonDoe_1985",
      email: "jhon@enterprise.com",
    },
  },
};
