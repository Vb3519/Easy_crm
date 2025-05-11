interface FormProps_Type {
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps_Type> = ({ className, children }) => {
  return (
    <form
      className={`w-[90%] p-4 flex flex-col gap-3 bg-[white] rounded-xl elem-shadow ${className} sm:w-[60%] sm:min-w-100 lg:w-[30%]`}
    >
      {children}
    </form>
  );
};

export default Form;
