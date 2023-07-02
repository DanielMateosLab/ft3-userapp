import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  error,
  ...props
}) => {
  const errorClass = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "";

  return (
    <div>
      <div className="flex items-center mb-2 justify-between">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <div className="text-red-500 text-xs italic">{error}</div>
      </div>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errorClass}`}
        type={type}
        id={props.id || props.name}
        {...props}
      />
    </div>
  );
};

export default TextInput;
