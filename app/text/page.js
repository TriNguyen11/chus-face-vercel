"use client";

import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../components/Dropdown";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const arrCharMW = ["M", "W"];
const arrCharmw = ["m", "w"];

const TextDetect = () => {
  const [name, setName] = useState("Chus");
  const [slogan, setSlogan] = useState("Craft with love, Shop with taste");
  const [isDownload, setIsDownload] = useState(false);
  const [subFontSize, setSubFontSize] = useState(0);

  const [debouncedNameValue] = useDebounce(name, 50);
  const [debouncedSloganValue] = useDebounce(slogan, 50);

  const downloadImg = async () => {
    setIsDownload(true);
    await sleep(500);
    html2canvas(document.getElementById("ImageDownload"), {}).then(
      async (canvas) => {
        setIsDownload(false);
        let cvs = document.createElement("canvas").appendChild(canvas);
        let link = document.createElement("a");
        link.download = "my-text-img";
        link.href = cvs.toDataURL("image/jpeg");
        link.click();
      }
    );
  };

  const handleDownload = () => downloadImg();

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

  useEffect(() => {}, []);

  return (
    <>
      {/* zuno added */}
      <div className="relative flex flex-col justify-center container-md mx-auto h-[100vh] w-[100vw] ">
        <div className="absolute top-2 left-2 z-10">
          <Dropdown />
        </div>
        <section className="text-center py-5 md:space-y-4 space-y-4 max-[415px]:py-0">
          <div className="flex flex-col md:flex-row items-center justify-center mt-0">
            <p className="text-[30px] mt-4 ml-[-20%] sm:ml-0">Play With</p>
            <span className="font-bold relative text-[40px] md:text-[50px]">
              Your Name
              <img
                className="w-6 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
        </section>
        <section className="grid sm:grid-cols-1 md:grid-cols-2 justify-around">
          <section className="flex flex-col justify-center md:px-10">
            <input
              onChange={(e) => {
                let countChar = 0;
                if (e.target.value.length <= 10) {
                  e.target.value.split("").map((e) => {
                    if (arrCharMW.includes(e)) countChar += 0.75;
                    if (arrCharmw.includes(e)) countChar += 0.55;
                    else countChar += 0.4;
                  });
                  setSubFontSize(countChar);
                  setName(e.target.value);
                }
              }}
              minLength="4"
              maxLength="10"
              type="text"
              className="p-6 sm:p-8 border border-slate-400 text-slate-400 text-xs rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full text-2xl sm:text-4xl text-center sm:text-left placeholder:text-slate-400"
              placeholder="Chus"
            />
            <p className="text-slate-400 text-xs text-center md:text-left p-2">
              From 4-10 Characters
            </p>
            <input
              onChange={(e) => {
                if (e.target.value.length <= 35) setSlogan(e.target.value);
              }}
              minLength="10"
              maxLength="35"
              max={35}
              type="text"
              className="p-3 sm:p-4 border border-slate-400 text-slate-400 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full text-lg sm:text-2xl text-center sm:text-left placeholder:text-slate-400"
              placeholder="Craft with love, Shop with taste"
            />
            <p className="text-slate-400 text-xs text-center md:text-left p-2">
              From 10-35 Characters
            </p>
            <div className="hidden md:flex flex-col justify-center items-center relative">
              <div className="mt-20">
                <span className="font-bold text-xl sm:text-7xl relative">
                  nguyên
                  <img
                    className="w-6 self-start absolute -top-10 -right-16 "
                    src="hat.png"
                  />
                </span>
              </div>
              <p className="text-black mt-3">
                Craft with love, Shop with taste
              </p>
            </div>
          </section>
          <div className="mx-auto">
            <div
              style={{
                width:
                  window.innerWidth > 768
                    ? window.innerWidth > 1280
                      ? "38vw"
                      : "45vw"
                    : window.innerWidth * 0.79 > window.innerHeight * 0.44
                    ? Math.round(window.innerWidth * 0.95) + "px"
                    : Math.round(window.innerHeight * 0.44) + "px",
                height:
                  window.innerWidth > 768
                    ? window.innerWidth > 1280
                      ? "38vw"
                      : "45vw"
                    : window.innerWidth * 0.79 > window.innerHeight * 0.44
                    ? Math.round(window.innerWidth * 0.95) + "px"
                    : Math.round(window.innerHeight * 0.44) + "px",
              }}
              id="ImageDownload"
              className={`flex flex-col flex-wrap justify-center items-center col-span-7 box-content rounded-xl shadow bg-nguyen`}
            >
              {name && (
                <p
                  id="name"
                  className={`font-bold  md:text-5xl lg:text-[65px] xl:text-[65px] text-white relative`}
                  style={{
                    fontSize:
                      (window.innerWidth > 768
                        ? window.innerWidth > 1024
                          ? 65 - subFontSize * 1.8
                          : 48
                        : 48 - subFontSize * 1.5) + "px",
                  }}
                >
                  <img
                    className={`${
                      isDownload
                        ? window.mobileAndTabletCheck()
                          ? "w-3"
                          : "w-6"
                        : "w-6"
                    } self-start absolute ${
                      isDownload
                        ? window.mobileAndTabletCheck()
                          ? "top-2"
                          : "top-0"
                        : "-top-4"
                    } ${
                      isDownload
                        ? window.mobileAndTabletCheck()
                          ? "-right-8"
                          : "-right-16"
                        : "-right-12"
                    }`}
                    src="hat.png"
                  />
                  {debouncedNameValue}
                </p>
              )}
              <div
                id="slogan"
                style={{}}
                className={`text-white max-w-[90%] text-center
                 ${
                   isDownload
                     ? window.mobileAndTabletCheck()
                       ? "mt-1"
                       : "md:mt-4 mt-4"
                     : " md:mt-2 -mt-2 "
                 }
                ${
                  isDownload
                    ? window.mobileAndTabletCheck()
                      ? "text-[12px]"
                      : "md:text-[22px] text-[14px]"
                    : "md:text-[22px] text-[16px]"
                }`}
              >
                {debouncedSloganValue.trim() !== ""
                  ? debouncedSloganValue
                  : "Craft with love, Shop with taste"}
              </div>
            </div>
          </div>
        </section>
        <section className="hidden sm:flex flex-col items-center pt-10 space-y-5">
          <button
            disabled={name.length < 4 || slogan.length < 10 ? true : false}
            onClick={handleDownload}
            type="button"
            className={`w-52 text-white ${
              name.length < 4 || slogan.length < 10
                ? "bg-gray-400"
                : "bg-[#45AAF8]"
            } hover:${
              name.length < 4 || slogan.length < 10
                ? "bg-gray-500"
                : "bg-blue-800"
            } focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2`}
            style={{
              boxShadow:
                "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            }}
          >
            Save & Download
          </button>
          <a href="/">
            <button
              type="button"
              className="w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
              style={{
                boxShadow:
                  "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}
            >
              Home
            </button>
          </a>
        </section>
        <section className="sm:hidden flex flex-col items-center py-5 space-y-4">
          <button
            disabled={name.length < 4 || slogan.length < 10 ? true : false}
            onClick={handleDownload}
            type="button"
            className="w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
            style={{
              boxShadow:
                "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            }}
          >
            Download
          </button>
          <a href="/">
            <button
              type="button"
              className="w-52 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
              style={{
                boxShadow:
                  "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}
            >
              Back & Not Save
            </button>
          </a>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default TextDetect;
