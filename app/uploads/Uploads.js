"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Transformer,
  Group,
} from "react-konva";
import useImage from "use-image";
var faceapi = require("../../face-api.min");
import Cropper from "cropperjs";
import * as htmlToImage from "html-to-image";
import Last from "./Last";
import html2canvas from "html2canvas";
import Slider from "react-input-slider";

let cropper;

const Uploads = () => {
  // let canvasToAdd = document.getElementsByTagName("canvas")[0];
  // const ctx = canvasToAdd.getContext("2d");
  const refImage = useRef();
  const refImageWrapper = useRef();

  const [isRotate, setIsRotate] = useState();

  const [selectedId, setSelectedId] = useState();
  const [isCreatedCrop, setIsCreatedCrop] = useState();
  const [arrayPos, setarrayPos] = useState([]);
  const [stepTwo, setStepTwo] = useState(false);

  const [last, setLast] = useState({
    isActive: false,
    imgUrl: null,
    isBack: false,
  });

  const [visibleCanvas, setVisibleCanvas] = useState(true);
  const [imgSaved, setImgSaved] = useState();
  const [imgCrop, setImgCrop] = useState();
  const [sizeOutput, setSizeOutput] = useState();
  const [sizeCanvas, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });
  const options = [
    {
      name: "Add",
      icon: (
        <svg
          className="stroke-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="Edit / Add_Plus_Circle">
            <path
              id="Vector"
              d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              stroke=""
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      action: () => {
        setarrayPos([
          ...arrayPos,
          {
            height: arrayPos[0]?.height ?? 47,
            id: 0,
            width: arrayPos[0]?.width ?? 30,
            x: 20,
            y: 20,
          },
        ]);
      },
    },
    {
      name: "Delete",
      icon: (
        <svg
          className="stroke-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.0004 9.5L17.0004 14.5M17.0004 9.5L12.0004 14.5M4.50823 13.9546L7.43966 17.7546C7.79218 18.2115 7.96843 18.44 8.18975 18.6047C8.38579 18.7505 8.6069 18.8592 8.84212 18.9253C9.10766 19 9.39623 19 9.97336 19H17.8004C18.9205 19 19.4806 19 19.9084 18.782C20.2847 18.5903 20.5907 18.2843 20.7824 17.908C21.0004 17.4802 21.0004 16.9201 21.0004 15.8V8.2C21.0004 7.0799 21.0004 6.51984 20.7824 6.09202C20.5907 5.71569 20.2847 5.40973 19.9084 5.21799C19.4806 5 18.9205 5 17.8004 5H9.97336C9.39623 5 9.10766 5 8.84212 5.07467C8.6069 5.14081 8.38579 5.2495 8.18975 5.39534C7.96843 5.55998 7.79218 5.78846 7.43966 6.24543L4.50823 10.0454C3.96863 10.7449 3.69883 11.0947 3.59505 11.4804C3.50347 11.8207 3.50347 12.1793 3.59505 12.5196C3.69883 12.9053 3.96863 13.2551 4.50823 13.9546Z"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      action: () => {
        const a = [...arrayPos].filter((item, index) => index !== selectedId);
        setSelectedId();
        setarrayPos(a);
      },
    },
    // {
    //   name: "Rotate",
    //   icon: (
    //     <svg
    //       className="stroke-black"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg">
    //       <path
    //         d="M11.5 20.5C6.80558 20.5 3 16.6944 3 12C3 7.30558 6.80558 3.5 11.5 3.5C16.1944 3.5 20 7.30558 20 12C20 13.5433 19.5887 14.9905 18.8698 16.238M22.5 15L18.8698 16.238M17.1747 12.3832L18.5289 16.3542L18.8698 16.238"
    //         stroke=""
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    // },

    // {
    //   name: "Crop",
    //   icon: (
    //     <svg
    //       className="stroke-black"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg">
    //       <path
    //         d="M6 3V10.5V14C6 15.8856 6 16.8284 6.58579 17.4142C7.17157 18 8.11438 18 10 18H13.5H21"
    //         stroke=""
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M18 21L18 13.5L18 10C18 8.11438 18 7.17157 17.4142 6.58579C16.8284 6 15.8856 6 14 6L10.5 6L3 6"
    //         stroke=""
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    //   action: () => {
    //     cropper = new Cropper(document.getElementsByTagName("img")[1], {
    //       dragMode: "crop",
    //       // rotatable: true,
    //       // autoCropArea: 0.5,
    //       autoCrop: true,
    //       viewMode: 0,
    //       center: true,
    //       autoCropArea: 1,
    //       initialAspectRatio: 1,
    //     });

    //     setVisibleCanvas(false);
    //   },
    // },
    {
      name: "Rotate",
      icon: (
        <svg
          className="stroke-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5 20.5C6.80558 20.5 3 16.6944 3 12C3 7.30558 6.80558 3.5 11.5 3.5C16.1944 3.5 20 7.30558 20 12C20 13.5433 19.5887 14.9905 18.8698 16.238M22.5 15L18.8698 16.238M17.1747 12.3832L18.5289 16.3542L18.8698 16.238"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      action: () => {
        handleRotate();

        // seIsSlectedWrapper(true);
      },
    },
  ];
  const handleReDetect = async (image) => {
    // console.log(image, "image");
    setImgSaved(image);
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    let imagePreview = document.getElementById("img-preview");
    const wrapCropper = document.getElementsByClassName("cropper-bg")[0];
    wrapCropper?.remove();
    // // image & canvas
    let canvas;
    imagePreview?.remove();
    // if (img) img.remove();

    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    imagePreview = await faceapi.bufferToImage(blob);
    // await sleep(1000);
    // console.log(img, "croppp");
    previewBlock.prepend(imagePreview);
    // console.log(imagePreview.width, "ceck imagePreview");
    canvas = await faceapi.createCanvasFromMedia(imagePreview);
    canvas.id = "id-canvas";
    const displaySize = {
      width: imagePreview.width,
      height: imagePreview.height,
    };
    previewBlock.style.width = imagePreview.width + "px";
    previewBlock.style.height = imagePreview.height + "px";
    setSizeCanvas({ width: imagePreview.width, height: imagePreview.height });
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(imagePreview)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    console.log(resizeDetections, "resizeDetections");
    let arrPosTemp = [];
    resizeDetections.forEach((detection, index) => {
      arrPosTemp.push({
        y: detection.detection.box.y - detection.detection.box.height / 4,
        x: detection.detection.box.x + detection.detection.box.width / 5,
        width: detection.detection.box.width / 2,
        height: detection.detection.box.height / 2,
        id: index,
      });
    });
    setVisibleCanvas(true);
    setStepTwo(true);
    setarrayPos(arrPosTemp);
  };
  const initUploader = () => {
    const input = document.getElementById("file-input");
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    let imagePreview = document.getElementById("img-preview");

    // image & canvas
    let img;
    let canvas;

    input.addEventListener("change", async () => {
      imagePreview.remove();
      if (img) img.remove();
      if (canvas) canvas.remove();

      console.log(input.files[0], "input.files[0]");
      // preview image
      imagePreview = await faceapi.bufferToImage(input.files[0]);
      imagePreview.id = "img-preview";
      setImgSaved(imagePreview.src);

      previewBlock.prepend(imagePreview);
      // console.log(img, "check img ");
      canvas = faceapi.createCanvasFromMedia(imagePreview);
      canvas.id = "id-canvas";
      const displaySize = {
        width: imagePreview.width,
        height: imagePreview.height,
      };
      previewBlock.style.width = imagePreview.width + "px";
      previewBlock.style.height = imagePreview.height + "px";
      setSizeCanvas({ width: imagePreview.width, height: imagePreview.height });
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(imagePreview)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      let arrPosTemp = [];
      resizeDetections.forEach((detection, index) => {
        arrPosTemp.push({
          y: detection.detection.box.y - detection.detection.box.height / 4,
          x: detection.detection.box.x + detection.detection.box.width / 5,
          width: detection.detection.box.width / 2,
          height: detection.detection.box.height / 2,
          id: index,
        });
      });
      setStepTwo(true);
      setarrayPos(arrPosTemp);
      // console.log(arrPosTemp, "arrPosTemp");
    });
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };
  const handleRotate = (e) => {
    if (isCreatedCrop) {
      cropper.crop();
    } else {
      cropper = new Cropper(
        document
          .getElementById("img-preview-id")
          .getElementsByTagName("img")[0],
        {
          dragMode: "crop",
          // rotatable: true,
          // autoCropArea: 0.5,
          autoCrop: false,
          viewMode: 0,
          center: true,
          autoCropArea: 1,
          initialAspectRatio: 1,
          cropBoxResizable: false,
        }
      );
      setIsCreatedCrop(true);
    }
    setIsRotate(true);
  };
  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
    ]).then(() => initUploader());
  }, []);
  useEffect(() => {
    if (last.isBack === true) handleReDetect(imgSaved);
    console.log(last.isBack, "last.isBacklast.isBack");
  }, [last]);
  useEffect(() => {
    if (imgCrop)
      cropper = new Cropper(document.getElementById("img-preview-id-crop"), {
        dragMode: "crop",
        // rotatable: true,
        // autoCropArea: 0.5,
        aspectRatio: 1,
        autoCrop: true,
        viewMode: 3,
        center: true,
        autoCropArea: 1,
        initialAspectRatio: 1,
        crop(e) {
          const timer = setTimeout(() => {
            refImage.current.src = cropper
              .getCroppedCanvas()
              .toDataURL("image/jpeg");
            return () => clearTimeout(timer);
          }, 300);

          setSizeOutput({ ...sizeOutput, ...e.detail });
        },
      });
  }, [imgCrop]);
  // console.log(sizeOutput, "sizeOutput");
  return (
    <>
      {last.isActive ? (
        <Last img={last.imgUrl} setLast={setLast} />
      ) : (
        <>
          <div
            className="container-lg mx-auto px-4 "
            style={
              {
                // width: "100vw",
                // overflow: "hidden",
              }
            }>
            <section className="text-center pt-5 space-y-4">
              <div className="flex justify-center items-end text-md gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 44 44"
                  fill="none"
                  className="fill-black">
                  <path
                    d="M6.875 5.5C6.51033 5.5 6.16059 5.64487 5.90273 5.90273C5.64487 6.16059 5.5 6.51033 5.5 6.875C5.5 7.23967 5.64487 7.58941 5.90273 7.84727C6.16059 8.10513 6.51033 8.25 6.875 8.25H7.5515C7.85007 8.25052 8.14036 8.3482 8.3785 8.5283C8.61664 8.70839 8.78969 8.9611 8.8715 9.24825L13.233 24.5108C13.4797 25.3721 14.0001 26.1296 14.7155 26.669C15.431 27.2083 16.3026 27.5 17.1985 27.5H29.7632C30.5878 27.5001 31.3935 27.2531 32.0764 26.7909C32.7592 26.3287 33.2878 25.6724 33.594 24.9068L37.6475 14.7702C37.8141 14.3531 37.8761 13.9016 37.8279 13.455C37.7797 13.0084 37.6229 12.5805 37.3711 12.2085C37.1193 11.8366 36.7803 11.5319 36.3836 11.3213C35.9869 11.1106 35.5447 11.0003 35.0955 11H12.232L11.5142 8.492C11.2682 7.63063 10.7484 6.87276 10.0335 6.33297C9.31855 5.79317 8.44733 5.50078 7.5515 5.5H6.875ZM15.8785 23.7518L13.0185 13.75H35.0927L31.0392 23.8865C30.9371 24.1414 30.761 24.3599 30.5336 24.5138C30.3061 24.6677 30.0378 24.7499 29.7632 24.75H17.1985C16.8999 24.7495 16.6096 24.6518 16.3715 24.4717C16.1334 24.2916 15.9603 24.0389 15.8785 23.7518ZM17.875 38.5C18.4167 38.5 18.9531 38.3933 19.4536 38.186C19.954 37.9787 20.4088 37.6749 20.7918 37.2918C21.1749 36.9088 21.4787 36.454 21.686 35.9536C21.8933 35.4531 22 34.9167 22 34.375C22 33.8333 21.8933 33.2969 21.686 32.7964C21.4787 32.296 21.1749 31.8412 20.7918 31.4582C20.4088 31.0751 19.954 30.7713 19.4536 30.564C18.9531 30.3567 18.4167 30.25 17.875 30.25C16.781 30.25 15.7318 30.6846 14.9582 31.4582C14.1846 32.2318 13.75 33.281 13.75 34.375C13.75 35.469 14.1846 36.5182 14.9582 37.2918C15.7318 38.0654 16.781 38.5 17.875 38.5ZM17.875 35.75C17.5103 35.75 17.1606 35.6051 16.9027 35.3473C16.6449 35.0894 16.5 34.7397 16.5 34.375C16.5 34.0103 16.6449 33.6606 16.9027 33.4027C17.1606 33.1449 17.5103 33 17.875 33C18.2397 33 18.5894 33.1449 18.8473 33.4027C19.1051 33.6606 19.25 34.0103 19.25 34.375C19.25 34.7397 19.1051 35.0894 18.8473 35.3473C18.5894 35.6051 18.2397 35.75 17.875 35.75ZM28.875 38.5C29.4167 38.5 29.9531 38.3933 30.4536 38.186C30.954 37.9787 31.4088 37.6749 31.7918 37.2918C32.1749 36.9088 32.4787 36.454 32.686 35.9536C32.8933 35.4531 33 34.9167 33 34.375C33 33.8333 32.8933 33.2969 32.686 32.7964C32.4787 32.296 32.1749 31.8412 31.7918 31.4582C31.4088 31.0751 30.954 30.7713 30.4536 30.564C29.9531 30.3567 29.4167 30.25 28.875 30.25C27.781 30.25 26.7318 30.6846 25.9582 31.4582C25.1846 32.2318 24.75 33.281 24.75 34.375C24.75 35.469 25.1846 36.5182 25.9582 37.2918C26.7318 38.0654 27.781 38.5 28.875 38.5ZM28.875 35.75C28.5103 35.75 28.1606 35.6051 27.9027 35.3473C27.6449 35.0894 27.5 34.7397 27.5 34.375C27.5 34.0103 27.6449 33.6606 27.9027 33.4027C28.1606 33.1449 28.5103 33 28.875 33C29.2397 33 29.5894 33.1449 29.8473 33.4027C30.1051 33.6606 30.25 34.0103 30.25 34.375C30.25 34.7397 30.1051 35.0894 29.8473 35.3473C29.5894 35.6051 29.2397 35.75 28.875 35.75Z"
                    fill=""
                  />
                </svg>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    window.location.href = "https://chus.vn/";
                  }}>
                  Shop At CHUS
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center mt-0 space-x-2">
                <p className="text-[40px] mt-2 ml-[-35%] sm:ml-0">Play With</p>
                <span className="font-bold relative text-[60px] md:text-[50px] ">
                  Your Image
                  <img
                    className="w-6 self-start absolute top-0 right-[-20px]"
                    src="hat.png"
                  />
                </span>
              </div>

              <section className="text-center pb-4 md:pb-16 mt-0">
                {!stepTwo ? (
                  <>
                    <label
                      type="button"
                      htmlFor="file-input"
                      className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      Upload Image
                    </label>
                    <input accept="image/*" type="file" id="file-input" />
                  </>
                ) : (
                  <a
                    onClick={() => {
                      // cropper.getCroppedCanvas().toDataURL("image/jpeg");
                      // let link = document.createElement("a");
                      // link.download = "my-upload-img";
                      // link.href = cropper
                      //   .getCroppedCanvas()
                      //   .toDataURL("image/jpeg");
                      // setLast({
                      //   isActive: true,
                      //   imgUrl: cropper
                      //     .getCroppedCanvas()
                      //     .toDataURL("image/jpeg"),
                      // });
                      setIsRotate(false);
                      if (cropper) cropper.clear();
                      html2canvas(
                        document.getElementById("img-preview-id"),
                        {}
                      ).then(async (canvas) => {
                        let cvs = document
                          .createElement("canvas")
                          .appendChild(canvas);
                        // console.log(cvs, "check cvs");
                        // cvs.style = { rotate: 20 };
                        // let link = document.createElement("a");
                        // link.download = "my-upload-img";
                        // link.href = cvs.toDataURL("image/png");
                        // link.click();
                        setLast({
                          isActive: true,
                          imgUrl: canvas.toDataURL("image/jpeg"),
                        });
                        setIsCreatedCrop(false);
                      });
                    }}>
                    <button
                      type="button"
                      className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      Next
                    </button>
                  </a>
                )}
              </section>
            </section>
            <section
              id="section-pro"
              className={`mt-4
            overflow-hidden`}>
              <div
                id="img-preview-id"
                className={` relative flex items-center justify-center mx-auto col-span-7 box-content bg-[#e9e7f1] w-[40vh] h-[40vh] rounded-xl shadow-lg first-letter:
                `}
                style={{
                  objectFit: "contain",
                }}>
                <img
                  htmlFor="file-input"
                  id="img-preview"
                  src="/uploads/imgEmpty.png"
                  style={{}}
                />
                {visibleCanvas && (
                  <Stage
                    ref={refImageWrapper}
                    className=""
                    style={{
                      position: "absolute",
                      top: 0,
                    }}
                    id="container"
                    width={sizeCanvas.width}
                    height={sizeCanvas.height}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}>
                    <Layer>
                      {arrayPos?.map((rect, i) => {
                        return (
                          <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={i === selectedId}
                            onSelect={() => {
                              setSelectedId(i);
                            }}
                            onChange={(newAttrs) => {
                              console.log(newAttrs, "newAttrs");
                              const rects = arrayPos.slice();
                              rects[i] = newAttrs;
                              setarrayPos(rects);
                            }}
                          />
                        );
                      })}
                    </Layer>
                  </Stage>
                )}
              </div>
            </section>
            {/* <InputSlider /> */}

            {stepTwo && (
              <>
                <section className=" mt-4 md:absolute md:right-[5vw] min-[900px]:right-[10vw] lg:right-[15vw] md:top-1/2 md:bg-white md:shadow md:rounded-lg grid grid-cols-2 grid-rows-2  items-center md:grid-cols-1 md:p-4 gap-4 md:gap-0 flex-wrap">
                  <p className="hidden md:block">EDIT</p>
                  {options.map((item, index) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={item.action}
                      className="flex px-4 py-2 bg-white opacity-80 items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      style={{ WebkitBackdropFilter: "blur(10px)" }}>
                      <div className="flex items-center justify-start">
                        {item.icon}
                      </div>
                      <div className="ml-2">
                        <p className="md:text-sm text-lg font-medium text-right">
                          {item.name}
                        </p>
                      </div>
                    </button>
                  ))}
                  {isRotate && (
                    <button
                      onClick={() => {
                        setIsRotate(false);
                        cropper.clear();
                      }}
                      type="button"
                      className=" md:mt-2 flex flex-row items-center justify-center text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        color: "black",
                        width: "100%",

                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      OK
                    </button>
                  )}
                  {isRotate && (
                    <button
                      onClick={() => {
                        cropper.rotate(-5);
                      }}
                      type="button"
                      className="md:mt-2 flex flex-row items-center justify-center text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        color: "black",
                        width: "100%",

                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      <img
                        src="/rotate-left.png"
                        style={{ width: 20, height: 20, marginRight: 10 }}
                      />{" "}
                      5 deg
                    </button>
                  )}
                  {isRotate && (
                    <button
                      onClick={() => {
                        cropper.rotate(5);
                      }}
                      type="button"
                      className="md:mt-2 flex flex-row items-center justify-center text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        color: "black",
                        width: "100%",

                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      <img
                        src="/rotate-right.png"
                        style={{ width: 20, height: 20, marginRight: 10 }}
                      />{" "}
                      5 deg
                    </button>
                  )}

                  {/* crop */}
                  {/* {!visibleCanvas && (
                  <>
                    <button
                      onClick={() => {
                        if (cropper.getCroppedCanvas()) {
                          handleReDetect(
                            cropper.getCroppedCanvas().toDataURL("image/jpeg")
                          );
                        } else {
                          cropper.clear();
                        }
                      }}
                      type="button"
                      className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                      style={{
                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      Ok
                    </button>
                    <button
                      onClick={() => {
                        cropper.clear();
                        handleReDetect(
                          cropper.getCroppedCanvas()?.toDataURL("image/jpeg")
                        );
                      }}
                      type="button"
                      className="text-white bg-[#FF5555] hover:bg-[#e30b13] focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2 mt-2"
                      style={{
                        boxShadow:
                          "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                      }}>
                      Clear
                    </button>
                  </>
                )} */}
                </section>
              </>
            )}
            {/* Ball */}
            <img
              className="absolute -left-10 bottom-[5vh] sm:bottom-[30vh] lg:left-[25%] md:left-[10%] sm:left-[5%]  w-28 sm:w-20 z-[-1] opacity-75"
              src="ball1.png"
            />
            <img
              className="absolute -right-3 sm:-right-2  bottom-[50%] sm:bottom-[40%] md:bottom-[50%] w-32 sm:w-24 md:32 z-[-1] opacity-75"
              src="ball2.png"
            />
            <img
              className="absolute  -left-8 md:-left-4 w-32 md:w-28  bottom-[48%]  z-[-1] opacity-75"
              src="ball3.png"
            />
            <img
              className="absolute md:block -right-[10%] sm:right-[2%] md:right-[10%] sm:bottom-[20vh] -bottom-[1vh] md:bottom-[30vh] w-40 md:w-32 sm:w-28 z-[-1] opacity-75"
              src="ball4.png"
            />
          </div>
        </>
      )}
    </>
  );
};

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  imgSaved,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [image] = useImage("hat.png");
  // const [image] = useImage("hat.png");

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      console.log(trRef.current.getLayer(), " trRef.current.getLayer()");
    }
  }, [isSelected]);

  return (
    <Group>
      <KonvaImage
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        rotation={-50}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          anchorCornerRadius={20}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const b64toBlob = async (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
export default Uploads;
