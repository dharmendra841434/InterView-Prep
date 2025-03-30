import { InputHTMLAttributes } from "react";

type CustomTextInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className=" font-light text-gray-700">{label}</label>
      <input
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent placeholder:font-light "
        {...rest}
      />
    </div>
  );
};

export default CustomTextInput;
