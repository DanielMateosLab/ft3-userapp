import type { Meta, StoryObj } from "@storybook/react";
import HorizontalContainer from "./HorizontalContainer";

const meta = {
  title: "Components/HorizontalContainer",
  component: HorizontalContainer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HorizontalContainer>;

export default meta;

type Story = StoryObj<typeof HorizontalContainer>;

export const Primary: Story = {
  args: {
    children: <div className="bg-amber-300">Test</div>,
  },
};
