import type {ButtonHTMLAttributes} from "react";
import type {ButtonVariant} from "../types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:opacity-90",
  secondary: "border border-line bg-surface text-ink hover:bg-ground",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`min-h-11 rounded-[10px] px-4 text-[15px] font-semibold ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
