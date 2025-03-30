import { useRef } from "react";

type ImagePickerProps = {
  onImageSelect: (file: File | null) => void;
  label: string;
};

const CustomImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelect,
  label = "Pick an Image",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageSelect(file);
  };

  return (
    <div className="flex flex-col items-start space-y-2 mt-5">
      <button
        type="button"
        onClick={handleButtonClick}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg  cursor-pointer"
      >
        {label}
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomImagePicker;
