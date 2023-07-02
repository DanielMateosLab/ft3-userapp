import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Primary: Story = { args: { text: "Main title" } };
