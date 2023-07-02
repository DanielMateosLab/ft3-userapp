import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormTextInput from "./FormTextInput";
import { Formik, Form, FormikConfig } from "formik";

describe("FormTextInput", () => {
  const setUp = (config: Partial<FormikConfig<{ name: string }>>) => {
    render(
      <Formik
        initialValues={{ name: "" }}
        onSubmit={config.onSubmit || (() => {})}
      >
        <Form>
          <FormTextInput name="name" label="Name" />
        </Form>
      </Formik>,
    );
  };

  const typeNameAndSubmit = async () => {
    await userEvent.type(screen.getByLabelText("Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Name"), "{enter}");
  };

  it("integrates with Formik", async () => {
    const onSubmit = jest.fn();
    setUp({ onSubmit });

    await typeNameAndSubmit();

    expect(onSubmit).toHaveBeenCalledWith(
      { name: "John Doe" },
      expect.anything(),
    );
  });

  it("outputs formik errors", async () => {
    const error = "This is an error";
    setUp({
      validate: () => ({ name: error }),
      onSubmit: (_, { setFieldError }) => setFieldError("name", error),
    });

    await typeNameAndSubmit();

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
