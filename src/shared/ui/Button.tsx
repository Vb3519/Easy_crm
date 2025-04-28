interface Button_Type {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button';
}

const Button = ({
  className,
  onClick,
  children,
  disabled,
  type,
}: Button_Type) => {
  return (
    <button
      className={`p-3 text-sm font-semibold rounded-lg cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
