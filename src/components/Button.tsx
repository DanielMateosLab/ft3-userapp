import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-amber-500 hover:bg-amber-600 active:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
