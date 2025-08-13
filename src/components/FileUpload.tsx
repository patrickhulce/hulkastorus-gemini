"use client";

import {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import UploadModal from "@/components/UploadModal";

export default function FileUpload({userId}: {userId: string}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFilesToUpload(acceptedFiles);
    setIsModalOpen(true);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFilesToUpload([]);
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 rounded-lg p-16 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        files={filesToUpload}
        userId={userId}
      />
    </>
  );
}
