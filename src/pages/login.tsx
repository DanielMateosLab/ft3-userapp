import Button from "@/components/Button";
import FormTextInput from "@/components/FormTextInput";
import { useAuthenticate } from "@/services/authentication";
import { loginUserSchema } from "@/utils/validators/userValidator";
import { Form, Formik } from "formik";

export default function Login() {
  const { error, login } = useAuthenticate("login");

  return (
    <div className="pt-4">
      <h1 className="text-3xl text-amber-900 font-bold mb-4">Login</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginUserSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await login(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2" noValidate>
            <FormTextInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <FormTextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              Login
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
