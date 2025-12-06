import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";

const FileInput = ({ onChange, error }) => {
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center gap-3">
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] dark:border-slate-700 flex items-center justify-center overflow-hidden">
        {image === "" ? (
          <CgProfile className="text-[6rem] text-[#e5eaf2] dark:text-slate-500" />
        ) : (
          <img
            src={image}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md text-sm"
        onClick={handleUploadImage}
      >
        Upload profile
      </button>

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
};

export default FileInput;
