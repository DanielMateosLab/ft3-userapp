import { useField } from "formik";
import TextInput from "./TextInput";

export interface FormTextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = (props) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <TextInput
        {...field}
        {...props}
        error={meta.touched ? meta.error : undefined}
      />
    </div>
  );
};

export default FormTextInput;
