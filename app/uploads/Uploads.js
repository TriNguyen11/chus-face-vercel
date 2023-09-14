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
import Step3And4 from "./Step3And4";
import html2canvas from "html2canvas";
import Slider from "react-input-slider";
import CropperImage, { ReactCropperElement } from "react-cropper";
import Dropdown from "../components/Dropdown";

let cropper;

const Uploads = () => {
  // let canvasToAdd = document.getElementsByTagName("canvas")[0];
  // const ctx = canvasToAdd.getContext("2d");
  const refImage = useRef();
  const refImageWrapper = useRef();
  const cropperRef = useRef(null);

  const [isRotate, setIsRotate] = useState();

  const [selectedId, setSelectedId] = useState();
  const [isCreatedCrop, setIsCreatedCrop] = useState();
  const [arrayPos, setarrayPos] = useState([]);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState();

  const [last, setLast] = useState({
    isActive: false,
    imgUrl: null,
    isBack: false,
  });

  const [visibleCanvas, setVisibleCanvas] = useState(true);
  const [imgSaved, setImgSaved] = useState();
  const iRef = useRef(null);
  const [imgCrop, setImgCrop] = useState();
  const [sizeOutput, setSizeOutput] = useState();
  const [sizeCanvas, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });

  let min;

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

    {
      name: "Crop",
      icon: (
        <svg
          className="stroke-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 3V10.5V14C6 15.8856 6 16.8284 6.58579 17.4142C7.17157 18 8.11438 18 10 18H13.5H21"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 21L18 13.5L18 10C18 8.11438 18 7.17157 17.4142 6.58579C16.8284 6 15.8856 6 14 6L10.5 6L3 6"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      action: () => {
        cropper = new Cropper(
          document
            .getElementById("img-preview-id")
            .getElementsByTagName("img")[0],
          {
            dragMode: "crop",
            // rotatable: true,
            // autoCropArea: 0.5,
            autoCrop: true,
            viewMode: 0,
            center: true,
            autoCropArea: 1,
            initialAspectRatio: 1,
          }
        );

        setVisibleCanvas(false);
      },
    },
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
        // handleRotate();
        // seIsSlectedWrapper(true);
      },
    },
  ];
  const options_step_2 = [
    {
      name: "Crop",
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
      action: async () => {
        setImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

        // const imgCrop = document
        //   .getElementsByClassName("cropper-canvas")[0]
        //   .getElementsByTagName("img")[0];
        // const imgCrop_Real = document
        //   .getElementsByClassName("cropper-view-box")[0]
        //   .getElementsByTagName("img")[0];
        // console.log({ imgCrop, imgCrop_Real });
        // imgCrop.src = x;
        // imgCrop_Real.src = x;
      },
    },
    {
      name: "Next",
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
        setLast({
          isActive: true,
          imgUrl: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
        });
        cropper = undefined;
      },
    },
  ];
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    if (step === 1) setStep(2);
  };
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

    setarrayPos(arrPosTemp);
  };
  const initUploader = () => {
    const ImagePreview = document.getElementById("img-preview");

    // image & canvas
    let img;
    let canvas;

    // input.addEventListener("change", async () => {
    //   if (img) img.remove();
    //   if (canvas) canvas.remove();

    // preview image
    // let imgBase64 = await faceapi.bufferToImage(input.files[0]);
    // imgBase64.id = "img-preview";
    // ImagePreview.src = imgBase64.src;
    // setImgSaved(imgBase64.src);

    // console.log(img, "check img ");
    // canvas = faceapi.createCanvasFromMedia(imagePreview);
    // canvas.id = "id-canvas";
    // const displaySize = {
    //   width: imagePreview.width,
    //   height: imagePreview.height,
    // };
    // previewBlock.style.width = imagePreview.width + "px";
    // previewBlock.style.height = imagePreview.height + "px";
    // setSizeCanvas({ width: imagePreview.width, height: imagePreview.height });
    // faceapi.matchDimensions(canvas, displaySize);

    // const detections = await faceapi
    //   .detectAllFaces(imagePreview)
    //   .withFaceLandmarks()
    //   .withFaceDescriptors();
    // const resizeDetections = faceapi.resizeResults(detections, displaySize);
    // let arrPosTemp = [];
    // resizeDetections.forEach((detection, index) => {
    //   arrPosTemp.push({
    //     y: detection.detection.box.y - detection.detection.box.height / 4,
    //     x: detection.detection.box.x + detection.detection.box.width / 5,
    //     width: detection.detection.box.width / 2,
    //     height: detection.detection.box.height / 2,
    //     id: index,
    //   });
    // });
    // setStep(2);
    // setarrayPos(arrPosTemp);
    // console.log(arrPosTemp, "arrPosTemp");
    // });
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) setSelectedId(null);
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
    // if (imgSaved)
    // if (cropper) {
    // } else {
    //   cropper = new Cropper(
    //     document
    //       .getElementById("img-preview-id")
    //       .getElementsByTagName("img")[0],
    //     {
    //       dragMode: "crop",
    //       autoCrop: true,
    //       viewMode: 3,
    //       center: false,
    //       autoCropArea: 1,
    //       initialAspectRatio: 1,
    //       aspectRatio: 1,
    //       scalable: false,
    //       data: {
    //         width: 500,
    //         height: 500,
    //       },
    //     }
    //   );
    // }
    if (
      step === 2 &&
      cropper === undefined &&
      document.getElementById("img-preview-id").getElementsByTagName("img")[0]
    ) {
      console.log(
        document.getElementById("img-preview-id").getElementsByTagName("img")[0]
          .width,
        "check widht"
      );
      cropper = new Cropper(
        document
          .getElementById("img-preview-id")
          .getElementsByTagName("img")[0],
        {
          dragMode: "crop",
          autoCrop: true,
          viewMode: 3,
          center: false,
          autoCropArea: 1,
          initialAspectRatio: 1,
          aspectRatio: 1,
          scalable: false,
          data: {
            width: 500,
            height: 500,
          },
        }
      );
    }
    // crop(e) {
    // const timer = setTimeout(() => {
    //   refImage.current.src = cropper
    //     .getCroppedCanvas()
    //     .toDataURL("image/jpeg");
    //   return () => clearTimeout(timer);
    // }, 300);
    // setSizeOutput({ ...sizeOutput, ...e.detail });
    // },
    //   }
    // );
  }, [last.isBack]);
  console.log(step, "sizeOutput");
  return (
    <>
      {last.isActive ? (
        <Step3And4
          img={last.imgUrl}
          setLast={setLast}
          // options={options_step_3}
        />
      ) : (
        <>
          <div className="absolute top-4 left-4">
            <Dropdown />
          </div>
          <section className="text-center lg:py-5 md:py-5 md:space-y-4 space-y-4 max-[415px]:py-0">
            <div className="flex flex-col md:flex-row  items-center justify-center mt-12 md:mt-0">
              <p className="md:text-[32px] md:mt-4 text-[20px] mt-2 ml-[-35%] sm:ml-0 font-light mr-4">
                Play With
              </p>
              <span className="font-bold relative text-[45px] md:text-[50px] -mt-4 md:mt-0 ">
                Your Image
                <img
                  className="w-6 self-start absolute top-0 right-[-20px]"
                  src="hat.png"
                />
              </span>
            </div>
          </section>
          <div
            className="container-lg mx-auto px-4  bg-white"
            style={{
              boxShadow:
                "md:w-[75vh] w-[70vw] rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
              maxWidth: 900,
            }}>
            <section
              id="section-pro"
              className="flex flex-col justify-between px-4 py-4"
              style={{
                boxShadow:
                  " rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
                maxWidth: 900,
              }}>
              {/* <img id="after-upload" className="object-contain w-40 h-40" /> */}
              <div
                className={` relative flex flex-col items-center justify-center mx-auto col-span-7 box-content bg-white  `}
                id="img-preview-id">
                {!image && (
                  <img
                    ref={iRef}
                    src={"/demo.jpg"}
                    id="img-preview"
                    className="object-contain"
                  />
                )}
                {image && (
                  <CropperImage
                    ref={cropperRef}
                    style={{ height: "50vh", width: "100%" }}
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
                )}
              </div>

              {/* {visibleCanvas && (
                  <Stage
                    ref={refImageWrapper}
                    // className="top-10"
                    style={{
                      position: "absolute",
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
                )} */}

              {step === 1 && (
                <div className=" mt-4 flex flex-col items-center">
                  <label
                    type="button"
                    htmlFor="file-input"
                    className=" text-center text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full  py-2 md:w-[25%] w-[80%]  flex flex-col items-center"
                    style={{
                      boxShadow:
                        "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                    }}>
                    Upload Image
                  </label>
                  <input
                    accept="image/*"
                    type="file"
                    id="file-input"
                    style={{ backgroundColor: "##45AAF8" }}
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    className=" my-4 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md  py-2 md:w-[25%]  w-[80%]  flex flex-col items-center"
                    style={{ WebkitBackdropFilter: "blur(10px)" }}>
                    <p className="text-white text-md font-medium text-right">
                      Home
                    </p>
                  </button>
                  {/* {options.map((item, index) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={item.action}
                    className="flex px-4 py-2 bg-[#45AAF8] opacity-80 items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 w-[30%] flex flex-col items-center"
                    style={{ WebkitBackdropFilter: "blur(10px)" }}>
                    <p className=" text-white md:text-sm text-lg font-medium text-right">
                      {item.name}
                    </p>
                  </button>
                ))} */}
                </div>
              )}
            </section>
            {/* <InputSlider /> */}

            {step === 2 && (
              <div className="w-full mt-4">
                <div className="flex md:flex-row flex-col items-center justify-around">
                  {options_step_2.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        name={item.name}
                        action={item.action}
                      />
                    );
                  })}
                  <label
                    type="button"
                    htmlFor="file-input-change"
                    className="my-2 text-white text-center bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full md:w-[30%] w-[80%] flex flex-col items-center "
                    style={{
                      padding: 0,
                      boxShadow:
                        "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                    }}>
                    <div className="py-2.5 md:py-1.5 ">Change Image</div>
                  </label>
                  <input
                    hidden
                    onChange={onChange}
                    accept="image/*"
                    type="file"
                    id="file-input-change"
                    style={{ backgroundColor: "##45AAF8" }}
                  />
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
                </div>
              </div>
            )}
            {/* Ball */}
            {/* <img
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
            /> */}
            <div style={{ height: 100 }}></div>
          </div>
        </>
      )}
    </>
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
const Button = ({ name, action }) => {
  return (
    <button
      type="button"
      key={name}
      onClick={action}
      className="my-2 md:my-0 md:w-[25%] w-[80%] flex flex-col px-4 py-2 bg-[#45AAF8] opacity-80 items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50  "
      style={{ WebkitBackdropFilter: "blur(10px)" }}>
      <p className=" text-white md:text-sm text-lg font-medium text-right">
        {name}
      </p>
    </button>
  );
};
export default Uploads;
