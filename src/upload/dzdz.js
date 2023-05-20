import React, { useEffect, useState } from "react";
import { Dropzone } from "dropzone";
import "../assets/styles/image-box.css";
import CameraIcon from "../assets/images/camera_icon.png";
import XButton from "../assets/images/x.png";

const UploadFilezzz = () => {
  const [isfull, setIsFull] = useState(false);
  useEffect(() => {
    // Dropzone.autoDiscover = false;
    const dropzone = new Dropzone("div.dropzone-2", {
      url: "http://localhost:8080/upload",
      dictDefaultMessage: "사진올려바",
      // previewTemplate: document.querySelector("#my-template").innerHTML,
      dictCancelUploadConfirmation: "파일 업로드 진짜 취소할거야?",
      acceptedFiles: ".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF",
      maxFiles: 6,
    });
  }, []);

  return (
    <div>
      <div className="dropzone dropzone-2">
        <div className="dz-message needsclick">
          <span className="text">
            <img src={CameraIcon} alt="Camera" />
            사진을 최대 6장까지 올려주세요.
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadFilezzz;
