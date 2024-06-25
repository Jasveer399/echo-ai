// components/UploadImage.tsx

import { UploadImage } from "@/lib/uploadImage";
import { FormEvent, useState } from "react";
import fs from 'fs'

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    try {
      const data = await UploadImage(image, "test");

      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  //   const handleSubmit = async (values: FieldValues) => {
  //     const image = values.image[0];

  //     console.log(image);
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default Upload;
