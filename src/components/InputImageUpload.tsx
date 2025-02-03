import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ApiError } from "../types/";
import Spinner from "./Spinner";

type InputImageUploadProps = {
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
};

function InputImageUpload({
  name,
  id,
  required,
  className,
}: InputImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `${import.meta.env.VITE_CLOUDINARY_API_URL}${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) throw new ApiError(response.statusText, response.status);

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files?.[0]) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(event.target.files[0]);
      setImageUrl(imageUrl);
    } catch (error) {
      toast.error(
        "An error occurred while uploading the image. Please try again later.",
      );
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type="file"
        id={id}
        disabled={!!(uploadingImage || imageUrl)}
        accept=".jpg,.jpeg"
        onChange={handleImageChange}
        className="hidden"
      />

      {!imageUrl && !uploadingImage ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs w-20 py-2 bg-teal-600 text-white rounded-md font-medium cursor-pointer hover:bg-teal-700 transition"
        >
          Upload
        </button>
      ) : (
        <button
          type="button"
          disabled={!imageUrl}
          onClick={() => {
            setImageUrl(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className={`w-20 flex items-center justify-center rounded-md py-0.5 ${uploadingImage ? "border border-teal-600" : "bg-red-500 cursor-pointer hover:bg-red-600 transition"}`}
        >
          {uploadingImage ? (
            <Spinner className="w-4 h-4" />
          ) : (
            <XMarkIcon className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      <input
        type="text"
        name={name}
        required={required}
        onKeyDown={(event) => event.preventDefault()}
        value={imageUrl ?? ""}
        className={className}
      />
    </div>
  );
}

export default InputImageUpload;
