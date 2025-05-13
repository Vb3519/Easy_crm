interface FormProps_Type {
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps_Type> = ({ className, children }) => {
  return (
    <form
      className={`text-sm w-[90%] p-4 flex flex-col gap-3 bg-[white] rounded-xl elem-shadow ${className} sm:w-[60%] sm:min-w-100 md:text-[16px] lg:w-[30%] lg:p-8 lg:gap-6`}
    >
      {children}
    </form>
  );
};

export default Form;
