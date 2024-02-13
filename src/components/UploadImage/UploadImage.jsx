import React, { useCallback, useState, useEffect } from "react";
import API from "../../api/axios";
import { useDropzone } from "react-dropzone";

const UploadImage = ({ setImage }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showDropzone, setShowDropzone] = useState(true);

  const uploadImageRoute = "api/upload-image";

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
      postImage(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  // Upload image to api
  const postImage = async (image) => {
    setUploadStatus("Uploading...");
    const requestData = {
      image: image,
    };
    const response = await API.post(`${uploadImageRoute}`, requestData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      let data = response.data.data;
      setImage(data.url);
      setUploadStatus("Upload image succesfully!");
    }
  };
  return (
    <>
      {showDropzone && (
        <div
          id="dropzone"
          className="flex items-center justify-center w-full p-2"
          {...getRootProps()}
        >
          <label
            htmlFor="dropzone-file"
            className="m-8 flex flex-col items-center justify-center w-full h-64 border-2 border-pink border-dashed rounded-4xl cursor-pointer hover:bg-pink-light"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-pink"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-grey">PNG or JPG (MAX. 800x400px)</p>
            </div>
            <input {...getInputProps()} />
          </label>
        </div>
      )}
      <div>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
        <p>{uploadStatus}</p>
      </div>
    </>
  );
};

export default UploadImage;
