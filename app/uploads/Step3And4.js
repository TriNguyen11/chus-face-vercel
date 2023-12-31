"use client";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Transformer,
  Group,
} from "react-konva";
import Dropdown from "../components/Dropdown";
import Konva from "konva";
import useImage from "use-image";
import { translation } from "../utils/translate";
const faceapi = require("../../face-api.min");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Loading = () => {
  const [progress, setProgress] = useState(10);
  const handleProgress = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newPro = prev + 1;
        if (newPro === 100) return clearInterval(interval);
        return 50;
      });
    }, 100);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    handleProgress();
  }, []);

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full shadow-lg dark:bg-gray-700">
      <div
        className="h-6 bg-nguyen rounded-full dark:bg-blue-500"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const ICON =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDI2LjY2NyA0MjYuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MjYuNjY3IDQyNi42Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjEzLjMzMyw4NS4zMzNWMEwxMDYuNjY3LDEwNi42NjdsMTA2LjY2NywxMDYuNjY3VjEyOGM3MC43MiwwLDEyOCw1Ny4yOCwxMjgsMTI4cy01Ny4yOCwxMjgtMTI4LDEyOHMtMTI4LTU3LjI4LTEyOC0xMjgNCgkJCUg0Mi42NjdjMCw5NC4yOTMsNzYuMzczLDE3MC42NjcsMTcwLjY2NywxNzAuNjY3UzM4NCwzNTAuMjkzLDM4NCwyNTZTMzA3LjYyNyw4NS4zMzMsMjEzLjMzMyw4NS4zMzN6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=";

const Step3And4 = ({ img, setLast }) => {
  const [step, setStep] = useState(3);
  const [visibleCanvas, setVisibleCanvas] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [imgStep3And4, setImgStep3And4] = useState();
  const [isBackInStep4And3, setIsBackInStep4And3] = useState();
  const [mouseDeselect, setMouseDeselect] = useState();

  const [isWebview, setIsWebview] = useState(false);
  let l;
  if (typeof window !== "undefined") {
    l = window.localStorage.getItem("lang");
  }

  const refImageWrapper = useRef();
  const refLayer = useRef();
  const finalImg = useRef(null);
  const [arrayPos, setarrayPos] = useState([]);
  const [sizeCanvas, setSizeCanvas] = useState({ width: 0, height: 0 });
  const options_edit = [
    {
      name: l === "en" ? "Add Sticker" : "Thêm nhãn dán",
      class: "popup1_edit",
      icon: <></>,
      action: () => {
        setarrayPos([
          ...arrayPos,
          {
            height: arrayPos[0]?.height ?? 50,
            id: 0,
            width: arrayPos[0]?.width ?? 50,
            x:
              document
                .getElementById("img-preview-id")
                .getElementsByTagName("img")[0].width / 2,
            y:
              document
                .getElementById("img-preview-id")
                .getElementsByTagName("img")[0].height / 2,
          },
        ]);
      },
    },
    {
      name: l === "en" ? "Delete Sticker" : "Xoá nhãn dán",
      class: "popup2_edit",
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
      name: l === "en" ? "Complete" : "Hoàn thành",
      class: "button1_image_edit",
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
        setSelectedId(null);
        // await sleep(500);
        // html2canvas(document.getElementById("img-preview-id"), {
        //   backgroundColor: "rgba(0,0,0,0)",
        // }).then(async (canvas) => {
        //   if (mouseDeselect) {
        //     const clickedOnEmpty =
        //       mouseDeselect.target === mouseDeselect.target.getStage();
        //     if (clickedOnEmpty) {
        //       setSelectedId(null);
        //     }
        //   }
        //   let cvs = document.createElement("canvas").appendChild(canvas);
        //   setImgStep3And4(canvas.toDataURL("image/jpeg", 1.0));
        //   document
        //     .getElementById("img-preview-id")
        //     .getElementsByTagName("img")[0].src = canvas.toDataURL(
        //     "image/jpeg",
        //     1.0
        //   );
        //   setStep(4);
        // });
        setStep(4);
      },
    },
    {
      name: l === "en" ? "Back" : "Trở về",
      class: "button2_image_edit",
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
      name: l === "en" ? "Download" : "Tải về",
      class: "button1_image_results",
      color: "#000000",
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
        setSelectedId(null);
        setTimeout(() => {
          downloadPcImg();
        }, 200);
      },
    },
    {
      name: l === "en" ? "Home" : "Trang chủ",
      class: "button3_image_results",
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
      name: l === "en" ? "Back to edit" : "Trở về chỉnh sửa",
      class: "button2_image_results",
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
        // setIsBackInStep4And3(!isBackInStep4And3);
        document
          .getElementById("img-preview-id")
          .getElementsByTagName("img")[0].src = img;
        setStep(3);
      },
    },
  ];

  const handleDetect = async (image) => {
    console.time("detecting...");
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    let imagePreview = previewBlock.getElementsByTagName("img")[0];
    const wrapCropper = document.getElementsByClassName("cropper-bg")[0];
    wrapCropper?.remove();
    // // image & canvas
    imagePreview?.remove();
    // if (img) img.remove();
    let canvas;

    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    imagePreview = await faceapi.bufferToImage(blob);
    imagePreview.style.maxWidth = "80vw";
    imagePreview.style.maxHeight = "80vw";
    imagePreview.style.opacity = 0;

    previewBlock.prepend(imagePreview);
    canvas = await faceapi.createCanvasFromMedia(imagePreview);
    canvas.id = "id-canvas";
    const displaySize = {
      width: imagePreview.width,
      height: imagePreview.height,
    };
    setSizeCanvas({ width: imagePreview.width, height: imagePreview.height });
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(imagePreview)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizeDetections = await faceapi.resizeResults(
      detections,
      displaySize
    );

    let arrPosTemp = [];
    resizeDetections.forEach((detection, index) => {
      arrPosTemp.push({
        y: detection.detection.box.y - detection.detection.box.height / 4,
        x: detection.detection.box.x + detection.detection.box.width / 5,
        width:
          detection.detection.box.width > detection.detection.box.height
            ? detection.detection.box.width / 2
            : detection.detection.box.height / 2,
        height:
          detection.detection.box.width > detection.detection.box.height
            ? detection.detection.box.width / 2
            : detection.detection.box.height / 2,
        id: index.toString(),
      });
    });
    setVisibleCanvas(true);
    setarrayPos(arrPosTemp);
    console.timeEnd("detecting...");
  };

  useEffect(() => {
    handleDetect(img);
  }, [isBackInStep4And3]);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) setSelectedId(null);
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

  const downloadPcImg = async () => {
    finalImg.current.style.display = "block";
    const x = document
      .getElementById("img-preview-id")
      .getElementsByTagName("img")[0];
    html2canvas(finalImg.current, {
      backgroundColor: "rgba(0,0,0,0)",
      width: x.offsetWidth - 1,
      height: x.offsetHeight - 1,
    }).then(async (canvas) => {
      let link = document.createElement("a");
      link.download = `play-with-chus-${new Date().getTime()}`;
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    });
  };

  const [isChangedLang, setIsChangedLang] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkWebview = () => {
        const navigator = window.navigator;
        const userAgent = navigator.userAgent;
        const normalizedUserAgent = userAgent.toLowerCase();
        const isAndroid = /android/.test(normalizedUserAgent);
        const isWebview =
          (isAndroid && /; wv\)/.test(normalizedUserAgent)) ||
          /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
            navigator.userAgent
          );

        return isWebview;
      };
      if (checkWebview()) setIsWebview(true);

      const tranData = translation[l];
      for (const t in tranData) {
        const elements = window.document.getElementsByClassName(t);
        if (elements.length > 0)
          for (let i = 0; i < elements.length; i++)
            elements[i].innerHTML = tranData[t];
      }
    }
  }, [isChangedLang]);

  const [progress, setProgress] = useState(0);
  const handleProgress = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newPro = prev + 1;
        if (newPro === 100) return clearInterval(interval);
        return newPro;
      });
    }, 20);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    document.getElementById("img-preview-id").style.opacity = 1;
    if (document.getElementById("img-preview-id")) {
      if (progress === undefined) {
        document
          .getElementById("img-preview-id")
          .getElementsByTagName("img")[0].style.opacity = 1;
      }
      if (progress < 100) {
        if (
          document
            .getElementById("img-preview-id")
            .getElementsByTagName("img")[0]
        )
          document
            .getElementById("img-preview-id")
            .getElementsByTagName("img")[0].style.opacity = 0;
      }
    }
  }, [progress]);

  useEffect(() => {
    handleProgress();
  }, []);

  return (
    <>
      <section className="text-center space-y-4 max-[415px]:py-0 md:mt-0 mt-[5vh]">
        <div className=" relative flex flex-col items-center max-w-md:justify-center md:my-10">
          <div>
            <img className="w-[12vh] md:[15vh] " src="logo-black.png" />
            <span className="font-bold relative text-[40px] md:text-[50px]">
              <span className="title2"></span>
              <img
                className="w-[18px] h-[18px] md:w-[28px] md:h-[28px] self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
          <div className="absolute bottom-2 right-2 z-20">
            <Dropdown
              setIsChangedLang={() => setIsChangedLang(!isChangedLang)}
            />
          </div>
        </div>
      </section>
      <div
        className="md:w-[60vh] w-[100%] container-lg mx-auto relative"
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
          maxWidth: 900,
          // backgroundColor: "rgba(254, 251, 240, 0.80)",
        }}>
        <section
          id="section-pro"
          className="overflow-hidden flex flex-col justify-center">
          <div
            ref={finalImg}
            id="img-preview-id"
            className=" opacity-0 object-contain relative flex flex-col items-center justify-center mx-auto col-span-7 box-content bg-white md:min-w-[50vh] md:min-h-[50vh]">
            {progress < 100 ? (
              <div className="absolute w-full h-6 bg-gray-200 rounded-full shadow-lg">
                <div
                  className="h-6 bg-nguyen rounded-full "
                  style={{ width: `${progress}%` }}></div>
              </div>
            ) : (
              <Stage
                ref={refImageWrapper}
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
                        onSelect={() => setSelectedId(i)}
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
        {step === 3 && (
          <div className="m-4 flex flex-col justify-center items-center text-left text-xs italic text-gray-400">
            <div>
              <p className="note1_edit">
                {l === "en"
                  ? "* Click on the stickers to start editing"
                  : "* Nhấp vào nhãn dán để bắt đầu chỉnh sửa hoặc xoá"}
              </p>
              <p className="note2_edit">
                {l === "en"
                  ? "* Face recognition will be automatically applied"
                  : "Tự động nhận diện khuôn mặt"}
              </p>
              <p className="note1_crop">
                {l === "en"
                  ? "* The photo size will affect the loading speed"
                  : "* Thời gian tải hình sẽ phụ thuộc vào dung lượng hình"}
              </p>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="md:absolute md:right-[-12vw] lg:right-[-8vw] md:top-[40%] md:bg-white md:shadow md:rounded-lg grid grid-cols-2 z-10 items-center justify-center md:grid-cols-1 md:p-4 gap-4 md:gap-0 flex-wrap">
            <p className="popup_edit hidden md:flex justify-center py-2 px-2 ml-[6px]">
              EDIT MODE
            </p>
            {options_edit.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={item.action}
                className={`md:border-1 max-w-md:border-0 flex justify-center px-4 py-2 bg-white opacity-80 items-center shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${item.class}`}
                style={{
                  WebkitBackdropFilter: "blur(10px)",
                  borderBottom: `${
                    window.innerWidth >= 768 &&
                    index !== options_edit.length - 1
                      ? "1px"
                      : "0px"
                  } solid black`,
                  opacity: 0.5,
                }}>
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
            <div className="flex md:flex-row flex-col items-center justify-around  w-[90%] md:w-[60%] ">
              {options_step_3.map((item, index) => {
                return (
                  <Button
                    key={index}
                    more={item.class}
                    name={item.name}
                    action={item.action}
                  />
                );
              })}
            </div>
          </div>
        )}
        {step === 4 && (
          <>
            {isWebview && (
              <div className="m-4 flex flex-col justify-center items-center text-left text-xs italic text-gray-400">
                <p className="text-red-400">
                  {l === "en"
                    ? "Open in external browser to download your photo"
                    : "Vui lòng mở bằng trình duyệt để tải hình"}
                </p>
              </div>
            )}

            <div className="w-full flex flex-row justify-center py-4 ">
              <div className="flex md:flex-row flex-col items-center justify-between w-[90%] md:w-[90%] ">
                {options_step_4.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      more={item.class}
                      name={item.name}
                      action={item.action}
                      color={item.color}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ height: 100 }}></div>
    </>
  );
};

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [image] = useImage("hat.png");
  React.useEffect(() => {
    if (isSelected) {
      const buttons = {
        rotater: {
          id: "Layer_1",
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><title>box-configurator-edit</title><circle cx="8" cy="8" r="8" style="fill:#000"/><path d="M10.6,7.5c-0.2,0.8-0.6,1.5-1.2,2c-0.1,0.1-0.2,0.1-0.3,0L8.2,9C7.8,9.3,7.4,9.6,6.9,9.8v1.1c0,0.1-0.1,0.2-0.2,0.3c-0.8,0.2-1.6,0.2-2.3,0c-0.1,0-0.2-0.1-0.2-0.3V9.8C3.6,9.6,3.2,9.3,2.8,9L1.9,9.5c-0.1,0.1-0.2,0-0.3,0c-0.5-0.6-0.9-1.3-1.2-2c0-0.1,0-0.2,0.1-0.3l0.9-0.5c-0.1-0.5-0.1-1,0-1.5L0.5,4.6C0.4,4.5,0.4,4.4,0.4,4.3c0.2-0.8,0.6-1.5,1.2-2c0.1-0.1,0.2-0.1,0.3,0l0.9,0.5C3.2,2.4,3.6,2.2,4.1,2V0.9c0-0.1,0.1-0.2,0.2-0.3c0.7-0.2,1.6-0.2,2.3,0c0.1,0,0.2,0.1,0.2,0.3V2c0.5,0.2,0.9,0.4,1.3,0.8l0.9-0.5c0.1-0.1,0.2,0,0.3,0c0.5,0.6,0.9,1.3,1.2,2c0,0.1,0,0.2-0.1,0.3L9.6,5.1c0.1,0.5,0.1,1,0,1.5l0.9,0.5C10.6,7.2,10.6,7.3,10.6,7.5z M7.2,5.9c0-0.9-0.8-1.7-1.7-1.7S3.8,4.9,3.8,5.9s0.8,1.7,1.7,1.7S7.2,6.8,7.2,5.9z"/></svg>',
          shape: trRef.current?.findOne(".rotater"),
        },
        // top_leftF: {
        //   path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-transform</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M.07,3.66v-3A.58.58,0,0,1,.65.07h3A.29.29,0,0,1,4,.36V.94a.29.29,0,0,1-.29.29H1.23V3.66A.29.29,0,0,1,.94,4H.36A.29.29,0,0,1,.07,3.66Zm7-3.3V.94a.29.29,0,0,0,.29.29H9.77V3.66a.29.29,0,0,0,.29.29h.58a.29.29,0,0,0,.29-.29v-3a.58.58,0,0,0-.58-.58h-3A.29.29,0,0,0,7.05.36Zm3.59,6.69h-.58a.29.29,0,0,0-.29.29V9.77H7.34a.29.29,0,0,0-.29.29v.58a.29.29,0,0,0,.29.29h3a.58.58,0,0,0,.58-.58v-3A.29.29,0,0,0,10.64,7.05ZM4,10.64v-.58a.29.29,0,0,0-.29-.29H1.23V7.34a.29.29,0,0,0-.29-.29H.36a.29.29,0,0,0-.29.29v3a.58.58,0,0,0,.58.58h3A.29.29,0,0,0,4,10.64Z"/></svg>',
        //   shape: trRef.current?.findOne(".top-left"),
        // },
        /*
        edit: {
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-edit</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.6,7.5c-0.2,0.8-0.6,1.5-1.2,2c-0.1,0.1-0.2,0.1-0.3,0L8.2,9C7.8,9.3,7.4,9.6,6.9,9.8v1.1c0,0.1-0.1,0.2-0.2,0.3c-0.8,0.2-1.6,0.2-2.3,0c-0.1,0-0.2-0.1-0.2-0.3V9.8C3.6,9.6,3.2,9.3,2.8,9L1.9,9.5c-0.1,0.1-0.2,0-0.3,0c-0.5-0.6-0.9-1.3-1.2-2c0-0.1,0-0.2,0.1-0.3l0.9-0.5c-0.1-0.5-0.1-1,0-1.5L0.5,4.6C0.4,4.5,0.4,4.4,0.4,4.3c0.2-0.8,0.6-1.5,1.2-2c0.1-0.1,0.2-0.1,0.3,0l0.9,0.5C3.2,2.4,3.6,2.2,4.1,2V0.9c0-0.1,0.1-0.2,0.2-0.3c0.7-0.2,1.6-0.2,2.3,0c0.1,0,0.2,0.1,0.2,0.3V2c0.5,0.2,0.9,0.4,1.3,0.8l0.9-0.5c0.1-0.1,0.2,0,0.3,0c0.5,0.6,0.9,1.3,1.2,2c0,0.1,0,0.2-0.1,0.3L9.6,5.1c0.1,0.5,0.1,1,0,1.5l0.9,0.5C10.6,7.2,10.6,7.3,10.6,7.5z M7.2,5.9c0-0.9-0.8-1.7-1.7-1.7S3.8,4.9,3.8,5.9s0.8,1.7,1.7,1.7S7.2,6.8,7.2,5.9z"/></svg>',
          shape: trRef.current?.findOne('.top-left')
        },
        */
        // top_right: {
        //   path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-delete</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.24,1.08v.66a.39.39,0,0,1-.36.36H1.12a.39.39,0,0,1-.36-.36V1.08A.39.39,0,0,1,1.12.72H3.64L3.82.3A.52.52,0,0,1,4.24,0h2.4a.61.61,0,0,1,.48.3L7.3.72H9.82C10.06.78,10.24.9,10.24,1.08ZM1.42,2.82h8.1V9.91a1.05,1.05,0,0,1-1,1H2.44a1.05,1.05,0,0,1-1-1ZM3.1,9.19a.39.39,0,0,0,.36.36.39.39,0,0,0,.36-.36V4.44a.39.39,0,0,0-.36-.36.39.39,0,0,0-.36.36Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,1,0-.72,0Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,0,0-.72,0Z"/></svg>',
        //   shape: trRef.current?.findOne(".top-right"),
        // },
      };
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
      for (let button in buttons) {
        let shape = buttons[button].shape;
        let selector = button.replace("_", "-");

        let icon = new Konva.Path({
          id: buttons[button].id,
          data: "M0.9,0.5c0.1,0,0.3,0.1,0.3,0.3L1.1,2.9c1-1.4,2.6-2.4,4.5-2.4c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3c-1.4,0-2.6-0.5-3.6-1.4c-0.1-0.1-0.1-0.3,0-0.4L2.3,9c0.1-0.1,0.3-0.1,0.4,0c0.7,0.7,1.7,1.1,2.8,1.1c2.3,0,4.2-1.9,4.2-4.2S7.8,1.7,5.5,1.7c-1.7,0-3.2,1-3.8,2.5l2.7-0.1c0.1,0,0.3,0.1,0.3,0.3v0.6c0,0.1-0.1,0.3-0.3,0.3H0.3C0.1,5.2,0,5.1,0,4.9V0.8c0-0.1,0.1-0.3,0.3-0.3H0.9z",
          fill: "black",
          scaleX: 2,
          scaleY: 2,
          // data: buttons[button].path,
          name: selector + "-icon",
        });
        icon.position(shape.position());
        icon.x(shape.x() - 11);
        icon.y(shape.y() - 11);
        trRef.current?.add(icon);

        if (selector == "top-right") {
          shape.listening(false);
          icon.on("click", () => {
            alert("delete");
          });
        }
      }
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
        rotation={-30}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        // rotation={-50}
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
            width: Math.max(node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          anchorFill="transparent"
          borderEnabled={true}
          rotateAnchorCursor="grab"
          rotateAnchorOffset={30}
          useSingleNodeRotation={true}
          centeredScaling={true}
          anchorSize={15}
          anchorCornerRadius={100}
          // borderStrokeWidth={1}
          borderStroke={"#000"}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            const buttons = {
              rotater: {
                id: "Layer_1",
                path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="#000"><title>box-configurator-edit</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.6,7.5c-0.2,0.8-0.6,1.5-1.2,2c-0.1,0.1-0.2,0.1-0.3,0L8.2,9C7.8,9.3,7.4,9.6,6.9,9.8v1.1c0,0.1-0.1,0.2-0.2,0.3c-0.8,0.2-1.6,0.2-2.3,0c-0.1,0-0.2-0.1-0.2-0.3V9.8C3.6,9.6,3.2,9.3,2.8,9L1.9,9.5c-0.1,0.1-0.2,0-0.3,0c-0.5-0.6-0.9-1.3-1.2-2c0-0.1,0-0.2,0.1-0.3l0.9-0.5c-0.1-0.5-0.1-1,0-1.5L0.5,4.6C0.4,4.5,0.4,4.4,0.4,4.3c0.2-0.8,0.6-1.5,1.2-2c0.1-0.1,0.2-0.1,0.3,0l0.9,0.5C3.2,2.4,3.6,2.2,4.1,2V0.9c0-0.1,0.1-0.2,0.2-0.3c0.7-0.2,1.6-0.2,2.3,0c0.1,0,0.2,0.1,0.2,0.3V2c0.5,0.2,0.9,0.4,1.3,0.8l0.9-0.5c0.1-0.1,0.2,0,0.3,0c0.5,0.6,0.9,1.3,1.2,2c0,0.1,0,0.2-0.1,0.3L9.6,5.1c0.1,0.5,0.1,1,0,1.5l0.9,0.5C10.6,7.2,10.6,7.3,10.6,7.5z M7.2,5.9c0-0.9-0.8-1.7-1.7-1.7S3.8,4.9,3.8,5.9s0.8,1.7,1.7,1.7S7.2,6.8,7.2,5.9z"/></svg>',
                shape: trRef.current?.findOne(".rotater"),
              },
              // top_left: {
              //   path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-transform</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M.07,3.66v-3A.58.58,0,0,1,.65.07h3A.29.29,0,0,1,4,.36V.94a.29.29,0,0,1-.29.29H1.23V3.66A.29.29,0,0,1,.94,4H.36A.29.29,0,0,1,.07,3.66Zm7-3.3V.94a.29.29,0,0,0,.29.29H9.77V3.66a.29.29,0,0,0,.29.29h.58a.29.29,0,0,0,.29-.29v-3a.58.58,0,0,0-.58-.58h-3A.29.29,0,0,0,7.05.36Zm3.59,6.69h-.58a.29.29,0,0,0-.29.29V9.77H7.34a.29.29,0,0,0-.29.29v.58a.29.29,0,0,0,.29.29h3a.58.58,0,0,0,.58-.58v-3A.29.29,0,0,0,10.64,7.05ZM4,10.64v-.58a.29.29,0,0,0-.29-.29H1.23V7.34a.29.29,0,0,0-.29-.29H.36a.29.29,0,0,0-.29.29v3a.58.58,0,0,0,.58.58h3A.29.29,0,0,0,4,10.64Z"/></svg>',
              //   shape: trRef.current?.findOne(".top-left"),
              // },
              /*
              edit: {
                path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-edit</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.6,7.5c-0.2,0.8-0.6,1.5-1.2,2c-0.1,0.1-0.2,0.1-0.3,0L8.2,9C7.8,9.3,7.4,9.6,6.9,9.8v1.1c0,0.1-0.1,0.2-0.2,0.3c-0.8,0.2-1.6,0.2-2.3,0c-0.1,0-0.2-0.1-0.2-0.3V9.8C3.6,9.6,3.2,9.3,2.8,9L1.9,9.5c-0.1,0.1-0.2,0-0.3,0c-0.5-0.6-0.9-1.3-1.2-2c0-0.1,0-0.2,0.1-0.3l0.9-0.5c-0.1-0.5-0.1-1,0-1.5L0.5,4.6C0.4,4.5,0.4,4.4,0.4,4.3c0.2-0.8,0.6-1.5,1.2-2c0.1-0.1,0.2-0.1,0.3,0l0.9,0.5C3.2,2.4,3.6,2.2,4.1,2V0.9c0-0.1,0.1-0.2,0.2-0.3c0.7-0.2,1.6-0.2,2.3,0c0.1,0,0.2,0.1,0.2,0.3V2c0.5,0.2,0.9,0.4,1.3,0.8l0.9-0.5c0.1-0.1,0.2,0,0.3,0c0.5,0.6,0.9,1.3,1.2,2c0,0.1,0,0.2-0.1,0.3L9.6,5.1c0.1,0.5,0.1,1,0,1.5l0.9,0.5C10.6,7.2,10.6,7.3,10.6,7.5z M7.2,5.9c0-0.9-0.8-1.7-1.7-1.7S3.8,4.9,3.8,5.9s0.8,1.7,1.7,1.7S7.2,6.8,7.2,5.9z"/></svg>',
                shape: trRef.current?.findOne('.top-left')
              },
              */
              // top_right: {
              //   path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-delete</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.24,1.08v.66a.39.39,0,0,1-.36.36H1.12a.39.39,0,0,1-.36-.36V1.08A.39.39,0,0,1,1.12.72H3.64L3.82.3A.52.52,0,0,1,4.24,0h2.4a.61.61,0,0,1,.48.3L7.3.72H9.82C10.06.78,10.24.9,10.24,1.08ZM1.42,2.82h8.1V9.91a1.05,1.05,0,0,1-1,1H2.44a1.05,1.05,0,0,1-1-1ZM3.1,9.19a.39.39,0,0,0,.36.36.39.39,0,0,0,.36-.36V4.44a.39.39,0,0,0-.36-.36.39.39,0,0,0-.36.36Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,1,0-.72,0Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,0,0-.72,0Z"/></svg>',
              //   shape: trRef.current?.findOne(".top-right"),
              // },
            };
            trRef.current?.update();
            for (let button in buttons) {
              let selector = button.replace("_", "-");
              let shape = trRef.current?.findOne("." + selector);
              let icon = trRef.current?.findOne("." + selector + "-icon");
              icon.position(shape.position());
              icon.x(icon.x() - 11);
              icon.y(icon.y() - 11);
              trRef.current?.getLayer().batchDraw();
            }
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

const Button = ({ more, name, action }) => {
  return (
    <button
      type="button"
      key={name}
      onClick={action}
      className={`w-full my-2 md:my-0 md:w-[40%] w-[50%] flex flex-col px-4 py-2 mx-1 ${
        name === "Download" ? `bg-[#097ddc]` : "bg-[#0a8bf5]"
      } opacity-80 items-center rounded-full shadow-lg md:shadow-none transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
      style={{ WebkitBackdropFilter: "blur(10px)" }}>
      <p
        className={`text-white md:text-sm text-lg font-medium text-center ${more}`}>
        {name}
      </p>
    </button>
  );
};

export default Step3And4;
