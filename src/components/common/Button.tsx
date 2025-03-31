import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
  label: React.ReactNode;
}

const Button = ({ variant = "primary", label, ...props }: IButtonProps) => {
  const baseStyles = "text-white px-3 py-1 rounded transition";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-red-600 hover:bg-red-700";

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
