import Button from "@/components/Button";
import FormTextInput from "@/components/FormTextInput";
import { signupUserSchema } from "@/utils/validators/userValidator";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();

  return (
    <div className="pt-4">
      <h1 className="text-3xl text-amber-900 font-bold mb-4">Sign Up</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={signupUserSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await fetch("/api/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            if (!res.ok) {
              const data = await res.json();
              setError(data.message);
            } else {
              router.push("/dashboard");
            }
          } catch (e) {
            setError("An error occurred. Please try again");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2" noValidate>
            <FormTextInput
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
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
            <FormTextInput
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              Sign Up
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
