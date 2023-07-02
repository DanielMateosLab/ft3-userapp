import type { Meta, StoryObj } from "@storybook/react";
import { Form, Formik } from "formik";
import FormTextInput, { FormTextInputProps } from "./FormTextInput";

const meta = {
  title: "Components/FormTextInput",
  component: FormTextInput,
  argTypes: { name: { control: { disable: true } } },
} satisfies Meta<typeof FormTextInput>;

export default meta;

type Story = StoryObj<typeof FormTextInput>;

const InputWithFormikContext: React.FC<FormTextInputProps> = (props) => {
  return (
    <Formik
      initialValues={{ [props.name]: "" }}
      validate={(values) => {
        const errors: Record<string, string> = {};

        if (values[props.name].length < 3) {
          errors[props.name] = "Must be at least 3 characters";
        }

        return errors;
      }}
      onSubmit={console.log}
    >
      <Form>
        <FormTextInput {...props} />
      </Form>
    </Formik>
  );
};

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Jhon Doe",
    type: "text",
    name: "name",
  },
  render: (args) => <InputWithFormikContext {...args} />,
};
