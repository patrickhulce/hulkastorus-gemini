"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@//components/ui/dialog";
import {Button} from "@//components/ui/button";
import {Progress} from "@//components/ui/progress";
import {useState} from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  userId: string;
}

export default function UploadModal({isOpen, onClose, files, userId}: UploadModalProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});

  const handleUpload = async () => {
    const directoryId = "default"; // TODO: Get actual directory ID

    for (const file of files) {
      setUploadStatus((prev) => ({...prev, [file.name]: "Uploading..."}));
      setUploadProgress((prev) => ({...prev, [file.name]: 0}));

      try {
        // Step 1: Get presigned URL
        const response = await fetch("/api/v1/files", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            mime_type: file.type,
            size_bytes: file.size,
            userId,
            directoryId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to get presigned URL: ${response.statusText}`);
        }

        const {fileId, presignedUrl} = await response.json();

        // Step 2: Upload file to R2
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", presignedUrl);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentCompleted = (event.loaded / event.total) * 100;
            setUploadProgress((prev) => ({...prev, [file.name]: percentCompleted}));
          }
        };
        xhr.onload = async () => {
          if (xhr.status === 200) {
            // Step 3: Update file status
            const statusResponse = await fetch(`/api/v1/files/${fileId}/status`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({status: "uploaded"}),
            });

            if (statusResponse.ok) {
              setUploadStatus((prev) => ({...prev, [file.name]: "Uploaded"}));
            } else {
              setUploadStatus((prev) => ({
                ...prev,
                [file.name]: `Failed to update status: ${statusResponse.statusText}`,
              }));
            }
          } else {
            setUploadStatus((prev) => ({...prev, [file.name]: `Upload failed: ${xhr.statusText}`}));
          }
        };
        xhr.onerror = () => {
          setUploadStatus((prev) => ({...prev, [file.name]: "Upload error"}));
        };
        xhr.send(file);
      } catch (error: unknown) {
        console.error("Upload error:", error);
        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: `Error: ${error instanceof Error ? error.message : String(error)}`,
        }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {files.map((file) => (
            <div key={file.name} className="mb-2">
              <p className="font-medium">{file.name}</p>
              <Progress value={uploadProgress[file.name] || 0} className="w-full" />
              <p className="text-sm text-gray-500">{uploadStatus[file.name]}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleUpload}>Upload</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
