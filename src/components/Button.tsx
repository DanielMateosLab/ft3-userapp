import { ButtonHTMLAttributes } from "react";

type ButtonVariants = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const buttonClasses = {
    primary: "bg-amber-500 hover:bg-amber-600 active:bg-gray-700 text-white",
    secondary:
      "border-gray-700 text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-200",
  };

  return (
    <button
      className={`${buttonClasses[variant]} font-semibold py-2 px-4 rounded border`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
