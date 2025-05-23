import { RxQuestionMarkCircled } from 'react-icons/rx';

interface EmptyTaskProps_Type {
  text: string;
}

const EmptyTask: React.FC<EmptyTaskProps_Type> = ({ text }) => {
  return (
    <li className="m-auto flex flex-col gap-4 items-center justify-center xl:m-0">
      <p className="font-semibold text-sm text-center">{text}</p>
      <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
    </li>
  );
};

export default EmptyTask;
