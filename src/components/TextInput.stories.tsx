import { useArgs } from "@storybook/addons";
import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof TextInput>;

const InteractiveInput: Story["render"] = (props) => {
  const [_, updateArgs] = useArgs();

  return (
    <TextInput
      {...props}
      onChange={(e) => updateArgs({ value: e.target.value })}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Write something",
    placeholder: "Type here",
    type: "text",
    name: "my-input",
    value: "",
  },
  render: InteractiveInput,
};
