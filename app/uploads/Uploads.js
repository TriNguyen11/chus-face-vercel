"use client";
import Konva from "konva";
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
