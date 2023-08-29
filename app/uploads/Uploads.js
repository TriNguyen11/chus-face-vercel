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
import html2canvas from "html2canvas";
let cropper;
const Uploads = () => {
  // let canvasToAdd = document.getElementsByTagName("canvas")[0];
  // const ctx = canvasToAdd.getContext("2d");
  const refImage = useRef();
  const [selectedId, setSelectedId] = useState();
  const [arrayPos, setarrayPos] = useState();
  const [visibleCanvas, setVisibleCanvas] = useState(true);
  const [imgModal, setImgModal] = useState();
  const [imgCrop, setImgCrop] = useState();
  const [sizeOutput, setSizeOutput] = useState();

  const [sizeCanvas, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });
  const initUploader = () => {
    const input = document.getElementById("file-input");
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    const imagePreview = document.getElementById("img-preview");

    // image & canvas
    let img;
    let canvas;

    input.addEventListener("change", async () => {
      imagePreview.remove();
      if (img) img.remove();
      if (canvas) canvas.remove();

      // preview image
      img = await faceapi.bufferToImage(input.files[0]);
      previewBlock.prepend(img);

      canvas = faceapi.createCanvasFromMedia(img);
      canvas.id = "id-canvas";
      const displaySize = { width: img.width, height: img.height };
      previewBlock.style.width = img.width + "px";
      previewBlock.style.height = img.height + "px";
      setSizeCanvas({ width: img.width, height: img.height });
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      let arrPosTemp = [];
      resizeDetections.forEach((detection, index) => {
        const box = detection.detection.box;
        let addImgPng = document.createElement("img");
        // addImgPng.src = "./hat.png";
        // addImgPng.style.position = "absolute";
        // addImgPng.style.transform = "rotateZ(-40deg)";
        // addImgPng.style.objectFit = "contain";
        // addImgPng.id = index;
        // addImgPng.addEventListener("click", (e) => {
        //   setSelectedId(index);
        // });
        arrPosTemp.push({
          y: detection.detection.box.y - detection.detection.box.height / 4,
          x: detection.detection.box.x + detection.detection.box.width / 5,
          width: detection.detection.box.width / 2,
          height: detection.detection.box.height / 2,
          id: index,
        });
        // addImgPng.style.top =
        //   detection.detection.box.y - detection.detection.box.height / 2 + "px";
        // // detection.detection.box.y - detection.detection.box.y / 1.1 + "px";
        // addImgPng.style.left =
        //   detection.detection.box.x + detection.detection.box.width / 4 + "px";
        // // detection.detection.box.x + detection.detection.box.x / 12 + "px";
        // addImgPng.style.width = detection.detection.box.width / 2 + "px";
        // addImgPng.style.height = detection.detection.box.height / 2 + "px";
        // parentCanvas.append(addImgPng);

        // const drawBox = new faceapi.draw.DrawBox(box, {
        //   label: "asd",
        // });
        const hat = document.createElement("image");
        // img.src = "./CHUS_HAT.png";
        // drawBox.draw(canvas);
      });
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

  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
    ]).then(() => initUploader());
  }, []);
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
            // refImage.current.src = cropper
            //   .getCroppedCanvas()
            //   .toDataURL("image/jpeg");
            return () => clearTimeout(timer);
          }, 300);

          setSizeOutput({ ...sizeOutput, ...e.detail });
        },
      });
  }, [imgCrop]);
  // console.log(sizeOutput, "sizeOutput");
  return (
    <>
      <div className="container-lg mx-auto px-4">
        <section className="text-center py-5 space-y-4">
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
            <span>Shop At CHUS</span>
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
          {/* <section className="md:absolute md:right-40 md:top-1/2 md:bg-white md:shadow md:rounded-lg grid grid-cols-2 grid-rows-2  items-center md:grid-cols-1 md:p-4 gap-4 md:gap-0">
            <p className="hidden md:block">EDIT</p>
            {options.map((item) => (
              <button
                type="button"
                key={item.name}
                className="flex px-4 py-2 md:bg-transparent items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
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
          </section> */}
          <section className="text-center py-10 space-x-10">
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
          </section>
        </section>
        <section className="mt-4">
          <div
            id="img-preview-id"
            className="flex items-center justify-center mx-auto col-span-7 box-content bg-[#e9e7f1] w-[40vh] h-[40vh] rounded-xl shadow-lg">
            <img
              htmlFor="file-input"
              id="img-preview"
              src="/uploads/imgEmpty.png"
              // style={{ objectFit: "contain" }}
            />
            {visibleCanvas && (
              <Stage
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
      {/* func */}
      <div className="container-2">
        {!imgCrop && (
          <div id="img-preview-id" className="preview">
            <img
              htmlFor="file-input"
              id="img-preview"
              src="/zuno.png"
              // style={{ objectFit: "contain" }}
            />
            {visibleCanvas && (
              <Stage
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
        )}
        {imgCrop && (
          <div id="img-preview-id" className="preview">
            <img src={imgCrop} id="img-preview-id-crop" />
          </div>
        )}
        <div
          // className="preview"
          style={{
            overflow: "hidden",
            // width: sizeOutput?.initWidth,
            // height: sizeOutput?.initHeight,
            width: 400,
            height: 400,
            position: "relative",
          }}>
          <img
            ref={refImage}
            src={imgCrop}
            id="out-put"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              // transform: `translateY(${
              //   (sizeOutput?.initHeight - sizeOutput?.height) / 2 - sizeOutput?.y
              // }px)  translateX(${-sizeOutput?.x / 2}px)`,
              // scale: sizeOutput?.initWidth / sizeOutput?.width / 2,
            }}
          />
          {/* <div
          style={{
            // backgroundColor: "transparent",
            top: sizeOutput.y / 2,
            left: sizeOutput.x / 2,
            position: "absolute",
            width: sizeOutput.width / 2,
            height: sizeOutput.height / 2,
          }}></div>
        <div
          style={{
            backgroundColor: "white",
            top: 0,
            left: sizeOutput.x / 2,
            position: "absolute",
            width: sizeOutput.width / 2,
            height: sizeOutput.y / 2,
          }}></div> */}
          {/* <div
          style={{
            backgroundColor: "white",
            top: sizeOutput.y / 2,
            left: sizeOutput.x / 2,
            position: "absolute",
            width: sizeOutput.width / 2,
            height: sizeOutput.height / 2,
          }}></div> */}
        </div>
        <div className="flex flex-col">
          <label htmlFor="file-input">Upload Image</label>
          <input accept="image/*" type="file" id="file-input" />
          <label
            htmlFor=""
            onClick={() => {
              cropper = new Cropper(document.getElementsByTagName("img")[0], {
                dragMode: "crop",
                // rotatable: true,
                // autoCropArea: 0.5,
                autoCrop: true,
                viewMode: 2,
                center: true,
                autoCropArea: 1,
                initialAspectRatio: 1,
              });
              // document
              //   .getElementsByTagName("img")[0]
              //   .classList.add("display-none");

              setVisibleCanvas(false);
            }}>
            crop Image
          </label>

          <label
            htmlFor=""
            onClick={() => {
              setarrayPos([
                ...arrayPos,
                {
                  height: arrayPos[0].height ?? 47,
                  id: 0,
                  width: arrayPos[0].width ?? 30,
                  x: 20,
                  y: 20,
                },
              ]);
            }}>
            Add Hat
          </label>
          <label
            htmlFor=""
            onClick={() => {
              const a = [...arrayPos].filter(
                (item, index) => index !== selectedId
              );
              setSelectedId();
              setarrayPos(a);
            }}>
            Remove Hat
          </label>
          <label
            htmlFor=""
            data-hs-overlay="#hs-slide-down-animation-modal"
            onClick={() => {
              setImgModal(cropper.getCroppedCanvas().toDataURL("image/jpeg"));
              console.log(
                cropper.getCroppedCanvas().toDataURL("image/jpeg"),
                "asd  "
              );
            }}>
            Test
          </label>
        </div>
        <div>
          <button
            onClick={async () => {
              // console.log(document.getElementById("img-preview-id"), "asd");
              // setImgModal(cropper.getCroppedCanvas().toDataURL("image/jpeg"));
              await html2canvas(document.getElementById("img-preview-id"), {
                proxy: "server.js",
                useCORS: true,
                onrendered: function (canvas) {
                  // document.body.appendChild(canvas);
                },
              }).then((canvas) => {
                setImgCrop(canvas.toDataURL("image/jpeg"));
                const img = new Image();
                img.src = canvas.toDataURL("image/jpeg");
                img.onload = function () {
                  console.log(img, "init");
                  setSizeOutput({
                    initWidth: img.width / 2,
                    initHeight: img.height / 2,
                  });
                };
              });
            }}
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            // data-hs-overlay="#hs-slide-down-animation-modal"
          >
            OK
          </button>
          <div
            id="hs-slide-down-animation-modal"
            className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    Modal title
                  </h3>
                  <button
                    type="button"
                    className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-slide-down-animation-modal">
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3.5 h-3.5"
                      width={8}
                      height={8}
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <img src={imgModal} />
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                  <button
                    type="button"
                    className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-slide-down-animation-modal">
                    Close
                  </button>
                  <a
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    href="#">
                    Save changes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [image] = useImage("hat.png");

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
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

export default Uploads;
