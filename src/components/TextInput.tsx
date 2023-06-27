import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  return (
    <div className="my-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        id={props.id || props.name}
        {...props}
      />
    </div>
  );
};

export default TextInput;
