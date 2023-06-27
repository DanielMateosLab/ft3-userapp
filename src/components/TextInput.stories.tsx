import type { Meta, StoryObj } from "@storybook/react";
import TextInput, { TextInputProps } from "./TextInput";
import { useState } from "react";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof TextInput>;

const InputWithState: React.FC<TextInputProps> = (props) => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Write something",
    placeholder: "Type here",
    type: "text",
    name: "my-input",
  },
  render: (args) => <InputWithState {...args} />,
};
