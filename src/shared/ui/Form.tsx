interface FormProps_Type {
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps_Type> = ({ className, children }) => {
  return (
    <form
      className={`p-4 w-[50%] flex flex-col gap-3 bg-[white] rounded-xl elem-shadow ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
