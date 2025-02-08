import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import styles from "./buttonUI.module.css";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const ButtonUI = ({
  variant = "primary",
  isLoading = false,
  startIcon,
  endIcon,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }
    props.onClick?.(event);
  };

  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        disabled || isLoading ? styles.disabled : "",
        className
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {startIcon && !isLoading && (
        <span className={styles.icon}>{startIcon}</span>
      )}
      {isLoading ? (
        <CircularProgress size={16} color="inherit" />
      ) : (
        <span>{children}</span>
      )}
      {endIcon && !isLoading && <span className={styles.icon}>{endIcon}</span>}
    </button>
  );
};
