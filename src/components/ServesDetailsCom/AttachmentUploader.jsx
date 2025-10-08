import React, { useState } from "react";
import { CloudUpload, X } from "lucide-react"; // ✅ Added X icon for remove
import "bootstrap/dist/css/bootstrap.min.css";
import { color } from "framer-motion";
import { getFetch } from "../../hooks/getFetch";

const AttachmentSection = ({ handleFileChange2 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  console.log("immmmmmmm:", files);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className=" attachment text-center p-5 rounded-3 "
        style={{
          borderStyle: "dotted",
          borderWidth: "2px",
          borderColor: isDragging ? "#007bff" : "#ced4da",
          backgroundColor: isDragging ? "#f8f9ff" : "#fdfdfd",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
          marginTop: "20px",
        }}
      >
        <CloudUpload size={60} color="#007bff" />
        <h6 className="mt-3 mb-2 fw-semibold text-dark">
          Drag & Drop files here or
        </h6>

        <label
          className="btn btn-primary px-4 mt-2"
          style={{ fontWeight: "500", borderRadius: "6px", cursor: "pointer" }}
        >
          Browse Files
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              handleFileChange(e);
              handleFileChange2(e);
            }}
          />
        </label>

        {files.length > 0 && (
          <div className="mt-4 text-start">
            <h6 className="fw-bold mb-2 text-secondary">Uploaded Files:</h6>
            <ul className="list-group list-group-flush">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    📎 {file.name}{" "}
                    <small className="text-muted">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </small>
                  </div>

                  <X
                    onClick={() => handleRemoveFile(index)}
                    size={20}
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AttachmentSection;
