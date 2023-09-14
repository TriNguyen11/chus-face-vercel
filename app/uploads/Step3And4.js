"use client";
import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import html2canvas from "html2canvas";
import * as download from "downloadjs";
import * as htmlToImage from "html-to-image";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Transformer,
  Group,
} from "react-konva";
import useImage from "use-image";
import Dropdown from "../components/Dropdown";
var faceapi = require("../../face-api.min");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// setLast({ isActive: false, imgUrl: img, isBack: true });

const Step3And4 = ({ img, setLast }) => {
  const [step, setStep] = useState(3);
  const [visibleCanvas, setVisibleCanvas] = useState(true);
  const [selectedId, setSelectedId] = useState();
  const [imgStep3And4, setImgStep3And4] = useState();
  const [isBackInStep4And3, setIsBackInStep4And3] = useState();
  const [mouseDeselect, setMouseDeselect] = useState();

  const refImage = useRef();
  const refImageWrapper = useRef();
  const finalImg = useRef(null);
  const refPcImage = useRef(null);
  const refMbImage = useRef(null);
  const [arrayPos, setarrayPos] = useState([]);
  const [sizeCanvas, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });
  const options_edit = [
    {
      name: "Add",
      icon: <></>,
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
      icon: <></>,
      action: () => {
        const a = [...arrayPos].filter((item, index) => index !== selectedId);
        setSelectedId();
        setarrayPos(a);
      },
    },
  ];
  const options_step_3 = [
    {
      name: "Save",
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
        html2canvas(document.getElementById("img-preview-id"), {}).then(
          async (canvas) => {
            if (mouseDeselect) {
              const clickedOnEmpty =
                mouseDeselect.target === mouseDeselect.target.getStage();
              if (clickedOnEmpty) {
                setSelectedId(null);
              }
            }
            let cvs = document.createElement("canvas").appendChild(canvas);
            setImgStep3And4(canvas.toDataURL("image/jpeg"));
            document
              .getElementById("img-preview-id")
              .getElementsByTagName("img")[0].src =
              canvas.toDataURL("image/jpeg");
            setStep(4);
          }
        );
      },
    },
    {
      name: "Back",
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
        setLast({ isActive: false, imgUrl: img, isBack: true });
      },
    },
  ];
  const options_step_4 = [
    {
      name: "Save & Download",
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
        downloadPcImg();
      },
    },
    {
      name: "Home",
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
        window.location.href = "/";
      },
    },
    {
      name: "Back to edit",
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
        setIsBackInStep4And3(!isBackInStep4And3);
        document
          .getElementById("img-preview-id")
          .getElementsByTagName("img")[0].src = img;
        setStep(3);
      },
    },
  ];
  const handleReDetect = async (image) => {
    // console.log(image, "image");
    // setImgSaved(image);
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    let imagePreview = previewBlock.getElementsByTagName("img")[0];
    console.log(imagePreview, "imagePreview");
    const wrapCropper = document.getElementsByClassName("cropper-bg")[0];
    wrapCropper?.remove();
    // // image & canvas
    let canvas;
    imagePreview?.remove();
    // if (img) img.remove();

    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    imagePreview = await faceapi.bufferToImage(blob);
    console.log(imagePreview, "imagePreview");
    imagePreview.style.maxWidth = "80vw";
    imagePreview.style.maxHeight = "80vw";
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
    // previewBlock.style.width = imagePreview.width + "px";
    // previewBlock.style.height = imagePreview.height + "px";
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
  // useEffect(() => {
  //   handleReDetect(img);
  // }, []);
  useEffect(() => {
    handleReDetect(img);
  }, [isBackInStep4And3]);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };
  if (typeof window !== "undefined") {
    window.mobileAndTabletCheck = function () {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
  }

  const pcDownLoad = async () => {
    finalImg.current.style.display = "block";
    const pcCanvas = await html2canvas(finalImg.current, {
      // width: 450,
      // height: 450,
    });
    console.log(pcCanvas);
    const cv = document.createElement("canvas").appendChild(pcCanvas);
    const link = document.createElement("a");
    link.download = "chus-pc-img";
    link.href = cv.toDataURL();
    link.click();
    finalImg.current.style.display = "none";
  };

  const downloadPcImg = async () => {
    // await pcDownLoad()
    finalImg.current.style.display = "block";
    // const dataUrl = await htmlToImage.toPng(
    //   finalImg.current.getElementsByTagName("img")[0],
    //   {
    //     cacheBust: true,
    //     quality: 0.95,
    //     width: 450,
    //     height: 450,
    //   }
    // );
    html2canvas(
      document.getElementById("img-preview-id").getElementsByTagName("img")[0]
      // finalImg.current.getElementsByTagName("img")[0]
    ).then(async (canvas) => {
      let cvs = document.createElement("canvas").appendChild(canvas);

      let link = document.createElement("a");
      link.download = "my-upload-img";
      link.href = cvs.toDataURL("image/jpeg");
      link.click();
      // setDegRotate(0);
    });
    // download(dataUrl, "my-image.png");
  };

  const downloadMbImg = async () => {
    finalImg.current.style.display = "block";
    const mbCanvas = await html2canvas(finalImg.current, {
      // width: 450,
      // height: 450,
    });
    const cv = document.createElement("canvas").appendChild(mbCanvas);
    const link = document.createElement("a");
    link.download = "chus-mb-img";
    link.href = cv.toDataURL("image/png");
    link.click();
    finalImg.current.style.display = "none";
  };
  console.log(step, "ASd");
  return (
    <>
      <div className="fixed top-4 left-4">
        <Dropdown />
      </div>
      <section className="text-center py-10 md:space-y-4 space-y-4 max-[415px]:py-0 mt-10">
        <div className="flex flex-col md:flex-row  items-center justify-center mt-0">
          <p className="md:text-[40px] text-[20px] -mb-4 md:mb-0 md:mt-2 ml-[-40%] sm:ml-0 font-light mr-4">
            Play With
          </p>
          <div className="font-bold relative text-[50px] md:text-[50px] ">
            Your Image
            <img
              className="w-6 self-start absolute top-0 right-[-20px]"
              src="hat.png"
            />
          </div>
        </div>
      </section>

      <div
        className=" md:w-[75vh] w-[100vw] container-lg mx-auto px-4 relative "
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
          maxWidth: 900,
          backgroundColor: "rgba(254, 251, 240, 0.80)",
        }}>
        <section
          id="section-pro"
          className={` overflow-hidden h-full flex flex-col justify-between`}>
          <div
            ref={finalImg}
            id="img-preview-id"
            className={` mt-4 relative flex flex-col items-center justify-center mx-auto col-span-7 box-content bg-white md:min-w-[50vh] md:min-h-[50vh]  `}
            style={{
              objectFit: "contain",
              OObjectFit: "contain",
            }}>
            <img
              htmlFor="file-input"
              id="img-preview"
              src="/demo.jpg"
              style={{}}
            />
            {visibleCanvas && step === 3 && (
              <Stage
                ref={refImageWrapper}
                // className="top-10"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                id="container"
                width={sizeCanvas.width}
                height={sizeCanvas.height}
                onMouseDown={(e) => {
                  setMouseDeselect(e);
                  checkDeselect(e);
                }}
                onTouchStart={(e) => {
                  setMouseDeselect(e);
                  checkDeselect(e);
                }}>
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
        {step === 3 && (
          <div className=" mt-2 flex justify-center text-xs italic text-gray-400">
            Face recognition will be automatically applied
          </div>
        )}
        {step === 3 && (
          <div className=" mt-4 md:absolute md:right-[0vw] min-[900px]:right-[0] lg:right-[2vw] md:top-[40%]  md:bg-white md:shadow md:rounded-lg grid grid-cols-2 z-10 items-center justify-center md:grid-cols-1 md:p-4 gap-4 md:gap-0 flex-wrap">
            <p className="hidden md:flex justify-center py-2 px-2 ml-[6px]">
              EDIT
            </p>
            {options_edit.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={item.action}
                className="flex justify-center px-4 py-2 bg-white opacity-80 items-center shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                style={{
                  WebkitBackdropFilter: "blur(10px)",
                  borderBottom: `${
                    index !== options_edit.length - 1 ? "1px" : "0px"
                  } solid black`,
                  opacity: 0.5,
                }}>
                {/* <div className="flex items-center justify-start">
                  {item.icon}
                </div> */}
                <div className="ml-2">
                  <p className="md:text-sm text-lg font-medium text-right">
                    {item.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="w-full flex flex-row justify-center py-4 ">
            <div className="flex md:flex-row flex-col items-center justify-around  w-[90%] md:w-[70%] ">
              {options_step_3.map((item, index) => {
                return <Button name={item.name} action={item.action} />;
              })}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="w-full flex flex-row justify-center py-4 ">
            <div className="flex md:flex-row flex-col items-center justify-between  w-[90%] md:w-[70%] ">
              {options_step_4.map((item, index) => {
                return <Button name={item.name} action={item.action} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div style={{ height: 100 }}></div>
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
          // anchorFill={}
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

const Button = ({ name, action }) => {
  return (
    <button
      type="button"
      key={name}
      onClick={action}
      className=" my-2 md:my-0 md:w-[25%] w-[80%] flex flex-col px-4 py-2 bg-[#45AAF8] opacity-80 items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50  "
      style={{ WebkitBackdropFilter: "blur(10px)" }}>
      <p className=" text-white md:text-sm text-lg font-medium text-center">
        {name}
      </p>
    </button>
  );
};
export default Step3And4;
