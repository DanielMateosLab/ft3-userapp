import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormTextInput from "./FormTextInput";
import { Formik, Form } from "formik";

describe("FormTextInput", () => {
  it("integrates with Formik", async () => {
    const onSubmit = jest.fn();
    render(
      <Formik initialValues={{ name: "" }} onSubmit={onSubmit}>
        <Form>
          <FormTextInput name="name" label="Name" />
        </Form>
      </Formik>,
    );

    await userEvent.type(screen.getByLabelText("Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Name"), "{enter}");

    expect(onSubmit).toHaveBeenCalledWith(
      { name: "John Doe" },
      expect.anything(),
    );
  });
});
