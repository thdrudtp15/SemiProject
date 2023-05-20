import Dropzone from "react-dropzone";
import { useState } from "react";
import "../../assets/styles/Uploadfile.css";
import CameraIcon from "../../assets/images/camera_icon.png";
import XButton from "../../assets/images/x.png";

const ImageBox = ({ onDrop, files }) => {
  const [previewFiles, setPreviewFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    console.log(previewFiles);
    if (previewFiles.length + acceptedFiles.length > 6) {
      alert("이미지는 최대 6개까지 업로드 가능합니다.");
    } else {
      onDrop(acceptedFiles);
      setPreviewFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
  };

  const handleDelete = (event, file) => {
    event.preventDefault();
    setPreviewFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };
  const handleFileClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="upload_file">
          <input {...getInputProps()} />
          {previewFiles.length === 0 && (
            <span className="text">
              <img src={CameraIcon} alt="Camera" />
              <br />
              사진을 최대 6장까지 올려주세요.
            </span>
          )}
          {previewFiles.length > 0 && (
            <div className="preview_files">
              <div className="file_list">
                {previewFiles.map((file, index) => (
                  <div key={index} className="file_item" onClick={handleFileClick}>
                    {index === 0 && <div className="main_text">대표 이미지</div>}
                    <img src={file.preview} alt={file.name} />
                    <img src={XButton} className="delete-button" onClick={(event) => handleDelete(event, file)} alt=""></img>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default ImageBox;
