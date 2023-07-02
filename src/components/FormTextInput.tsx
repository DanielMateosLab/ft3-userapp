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
    <div className="my-2">
      <TextInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormTextInput;
