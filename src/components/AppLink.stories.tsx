import type { Meta, StoryObj } from "@storybook/react";
import AppLink from "./AppLink";

const meta = {
  title: "Components/AppLink",
  component: AppLink,
} satisfies Meta<typeof AppLink>;

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = { args: { href: "/", text: "Home" } };
