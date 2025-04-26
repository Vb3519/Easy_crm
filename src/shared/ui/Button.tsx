interface ButtonProp_Type {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProp_Type> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
