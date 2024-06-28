// components/UploadImage.tsx

import { UploadImage } from "@/lib/uploadImage";
import { FormEvent, useState } from "react";
import fs from 'fs'
import axios from "axios";

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  let url:string='';
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

      try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post("/api/uploadimage", formData);
        const data = await response.data;

        console.log(data);
        url = data.data.secure_url;
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
