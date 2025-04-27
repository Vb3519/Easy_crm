interface Button_Type {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ className, onClick, children, disabled }: Button_Type) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
