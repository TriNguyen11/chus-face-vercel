"use client";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function Home() {
  const [image, setImage] = useState("test.jpg");
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  const refStage = useRef(null);
  const refLayer = useRef(null);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const finishImg = cropperRef.current?.cropper.getCroppedCanvas();
      setCropData(finishImg.toDataURL("image/jpeg", 1.0));
      setImage(finishImg.toDataURL("image/jpeg", 1.0));
    }
  };

  const downloadFinishImg = async () => {
    const canvas = await html2canvas(document.getElementById("cropped-img"), {
      backgroundColor: "rgba(0,0,0,0)",
    });

    let link = document.createElement("a");
    link.download = "zuno-upload-img";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  };

  useEffect(() => {}, [image, cropData]);

  return (
    <>
      <div className="container-md mx-auto py-8">
        <div
          className="box-border p-10 inline-block"
          style={{ width: "50%", float: "right" }}
        >
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{
              width: "100%",
              float: "left",
              height: "300px",
              overflow: "hidden",
            }}
          />
        </div>
        <div
          className="box-border p-10 inline-block"
          style={{
            width: "50%",
            float: "right",
            height: "100%",
          }}
        >
          <h1>Crop</h1>
          <img
            id="cropped-img"
            style={{ width: "100%", height: "100%" }}
            src={cropData}
            alt="cropped"
          />
        </div>
      </div>
      <section className="py-8 flex flex-col justify-center space-y-4 container">
        <div id="preview" className="">
          <Cropper
            ref={cropperRef}
            style={{ height: 600, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
        </div>
        <label
          type="button"
          className="mx-auto text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-2 md:w-[25%] w-[80%]  flex flex-col items-center"
          style={{
            boxShadow:
              "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
          }}
          onClick={getCropData}
        >
          CROP
        </label>
        <label
          type="button"
          className="mx-auto text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-2 md:w-[25%] w-[80%]  flex flex-col items-center"
          style={{
            boxShadow:
              "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
          }}
          onClick={downloadFinishImg}
        >
          DOWNLOAD
        </label>

        <div className="w-full">
          <label
            type="button"
            htmlFor="file-input"
            className="mx-auto text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-2 md:w-[25%] w-[80%]  flex flex-col items-center"
            style={{
              boxShadow:
                "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            }}
          >
            Upload Image
          </label>
          <input
            accept="image/*"
            type="file"
            id="file-input"
            onChange={onChange}
          />
        </div>
      </section>
    </>
  );
}
