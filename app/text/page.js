"use client";

import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const TextDetect = () => {
  const [name, setName] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const toastId = useRef(null);

  const preventInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return notify("enter", "Could not press Enter in input!");
    }
    if (e.code === "Space") {
      e.preventDefault();
      return notify("space", "Could not press Space in input!");
    }
    const regx = /^[0-9a-zA-Z\s&]+$/;
    const isSpecialChar = !regx.test(removeAscent(e.key));

    if (isSpecialChar) {
      e.preventDefault();
      return notify(
        "special",
        "From 4-10 Characters, no special characters like $,%,&,*,#,@,..."
      );
    }
  };
  const checkValidInput = () => {
    const specials = /^[a-zA-Z0-9]{4,10}$/;
    return specials.test(removeAscent(name));
  };
  const notify = (type, mess) => {
    if (!toast.isActive(toastId.current)) toast.error(mess, { toastId: type });
  };
  const downloadImg = async () => {
    setIsDownload(true);
    await sleep(500);
    html2canvas(document.getElementById("ImageDownload"), {}).then(
      async (canvas) => {
        setIsDownload(false);

        let cvs = document.createElement("canvas").appendChild(canvas);
        let link = document.createElement("a");
        link.download = "my-text-img";
        link.href = cvs.toDataURL();
        link.click();
      }
    );
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => setName(name), 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [name, 300]);

  const handleDownload = () => {
    if (!checkValidInput())
      return notify(
        "special",
        "From 4-10 Characters, no special characters like $,%,&,*,#,@,..."
      );
    downloadImg();
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
  useEffect(() => {}, []);

  return (
    <>
      {/* zuno added */}
      <div className=" relative container-lg mx-auto h-[120vh] overflow-hidden w-[100vw]">
        <section className="text-center py-10 md:space-y-4 space-y-4 max-[415px]:py-0">
          <div className="flex justify-center items-end text-md  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 44 44"
              fill="none"
              className="fill-black"
            >
              <path
                d="M6.875 5.5C6.51033 5.5 6.16059 5.64487 5.90273 5.90273C5.64487 6.16059 5.5 6.51033 5.5 6.875C5.5 7.23967 5.64487 7.58941 5.90273 7.84727C6.16059 8.10513 6.51033 8.25 6.875 8.25H7.5515C7.85007 8.25052 8.14036 8.3482 8.3785 8.5283C8.61664 8.70839 8.78969 8.9611 8.8715 9.24825L13.233 24.5108C13.4797 25.3721 14.0001 26.1296 14.7155 26.669C15.431 27.2083 16.3026 27.5 17.1985 27.5H29.7632C30.5878 27.5001 31.3935 27.2531 32.0764 26.7909C32.7592 26.3287 33.2878 25.6724 33.594 24.9068L37.6475 14.7702C37.8141 14.3531 37.8761 13.9016 37.8279 13.455C37.7797 13.0084 37.6229 12.5805 37.3711 12.2085C37.1193 11.8366 36.7803 11.5319 36.3836 11.3213C35.9869 11.1106 35.5447 11.0003 35.0955 11H12.232L11.5142 8.492C11.2682 7.63063 10.7484 6.87276 10.0335 6.33297C9.31855 5.79317 8.44733 5.50078 7.5515 5.5H6.875ZM15.8785 23.7518L13.0185 13.75H35.0927L31.0392 23.8865C30.9371 24.1414 30.761 24.3599 30.5336 24.5138C30.3061 24.6677 30.0378 24.7499 29.7632 24.75H17.1985C16.8999 24.7495 16.6096 24.6518 16.3715 24.4717C16.1334 24.2916 15.9603 24.0389 15.8785 23.7518ZM17.875 38.5C18.4167 38.5 18.9531 38.3933 19.4536 38.186C19.954 37.9787 20.4088 37.6749 20.7918 37.2918C21.1749 36.9088 21.4787 36.454 21.686 35.9536C21.8933 35.4531 22 34.9167 22 34.375C22 33.8333 21.8933 33.2969 21.686 32.7964C21.4787 32.296 21.1749 31.8412 20.7918 31.4582C20.4088 31.0751 19.954 30.7713 19.4536 30.564C18.9531 30.3567 18.4167 30.25 17.875 30.25C16.781 30.25 15.7318 30.6846 14.9582 31.4582C14.1846 32.2318 13.75 33.281 13.75 34.375C13.75 35.469 14.1846 36.5182 14.9582 37.2918C15.7318 38.0654 16.781 38.5 17.875 38.5ZM17.875 35.75C17.5103 35.75 17.1606 35.6051 16.9027 35.3473C16.6449 35.0894 16.5 34.7397 16.5 34.375C16.5 34.0103 16.6449 33.6606 16.9027 33.4027C17.1606 33.1449 17.5103 33 17.875 33C18.2397 33 18.5894 33.1449 18.8473 33.4027C19.1051 33.6606 19.25 34.0103 19.25 34.375C19.25 34.7397 19.1051 35.0894 18.8473 35.3473C18.5894 35.6051 18.2397 35.75 17.875 35.75ZM28.875 38.5C29.4167 38.5 29.9531 38.3933 30.4536 38.186C30.954 37.9787 31.4088 37.6749 31.7918 37.2918C32.1749 36.9088 32.4787 36.454 32.686 35.9536C32.8933 35.4531 33 34.9167 33 34.375C33 33.8333 32.8933 33.2969 32.686 32.7964C32.4787 32.296 32.1749 31.8412 31.7918 31.4582C31.4088 31.0751 30.954 30.7713 30.4536 30.564C29.9531 30.3567 29.4167 30.25 28.875 30.25C27.781 30.25 26.7318 30.6846 25.9582 31.4582C25.1846 32.2318 24.75 33.281 24.75 34.375C24.75 35.469 25.1846 36.5182 25.9582 37.2918C26.7318 38.0654 27.781 38.5 28.875 38.5ZM28.875 35.75C28.5103 35.75 28.1606 35.6051 27.9027 35.3473C27.6449 35.0894 27.5 34.7397 27.5 34.375C27.5 34.0103 27.6449 33.6606 27.9027 33.4027C28.1606 33.1449 28.5103 33 28.875 33C29.2397 33 29.5894 33.1449 29.8473 33.4027C30.1051 33.6606 30.25 34.0103 30.25 34.375C30.25 34.7397 30.1051 35.0894 29.8473 35.3473C29.5894 35.6051 29.2397 35.75 28.875 35.75Z"
                fill=""
              />
            </svg>
            <span
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "https://chus.vn/";
              }}
            >
              Shop At CHUS
            </span>
          </div>
          <div className="flex flex-col md:flex-row  items-center justify-center mt-0">
            <p className="text-[40px] mt-2 ml-[-40%] sm:ml-0">Play With</p>
            <span className="font-bold relative text-[65px] md:text-[50px] ">
              Your Name
              <img
                className="w-6 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
        </section>
        <section className="grid sm:grid-cols-1 md:grid-cols-2 justify-around">
          <div className="px-4">
            <input
              onKeyDown={(e) => preventInput(e)}
              onChange={(e) => setName(e.target.value)}
              minLength="4"
              maxLength="10"
              type="text"
              style={{
                fontSize: 18,
              }}
              className=" p-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full"
              placeholder="Your name..."
            />
            <p className="text-xs p-4">
              From 4-10 Characters, no special characters like $,%,&,*,#,@,...
            </p>
            <div className="hidden md:flex flex-col justify-center items-center relative">
              <div className="mt-20">
                <span className="font-bold text-xl sm:text-7xl relative">
                  nguyên
                  <img
                    className="w-10 self-start absolute -top-10 -right-16 "
                    src="hat.png"
                  />
                </span>
              </div>

              <p className="text-black mt-3">
                Craft with love, Shop with taste
              </p>
            </div>
          </div>
          <section className="sm:hidden flex justify-center py-2 ">
            <button
              disabled={name.length < 4 ? true : false}
              onClick={handleDownload}
              type="button"
              className=" mr-4 text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
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
                className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                style={{
                  boxShadow:
                    "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                }}
              >
                Back
              </button>
            </a>
          </section>
          <div className=" mx-auto">
            <div
              id="ImageDownload"
              className=" md:overflow-hidden flex flex-col justify-center items-center  col-span-7 box-content w-[43vh] h-[43vh] md:w-[48vw] md:h-[48vw] xl:w-[38vw] xl:h-[38vw] rounded-xl shadow bg-nguyen"
            >
              {name && (
                <span
                  id="name"
                  className={`font-bold ${
                    name.length <= 8 ? "text-[40px]" : "text-[32px]"
                  } md:text-5xl lg:text-[70px] xl:text-[72px]  text-white relative ${
                    isDownload
                      ? window.mobileAndTabletCheck()
                        ? "mb-2"
                        : "mb-8"
                      : "mb-[4px]"
                  }`}
                >
                  <img
                    className={`${
                      isDownload
                        ? window.mobileAndTabletCheck()
                          ? "w-6"
                          : "w-10"
                        : "w-10"
                    } self-start absolute ${
                      isDownload
                        ? window.mobileAndTabletCheck()
                          ? "-top-0"
                          : "-top-0"
                        : "-top-8"
                    }
                      ${
                        isDownload
                          ? window.mobileAndTabletCheck()
                            ? "-right-10"
                            : "-right-16"
                          : "-right-12"
                      }`}
                    src="hat.png"
                  />
                  {name}
                </span>
              )}
              <p
                className={`text-white  ${
                  isDownload && window.mobileAndTabletCheck() && name.length > 8
                    ? "-mt-2"
                    : "-mt-0"
                }
                ${
                  isDownload
                    ? window.mobileAndTabletCheck()
                      ? "text-[12px]"
                      : "text-[14px]"
                    : "text-[14px]"
                }`}
              >
                Craft with love, Shop with taste
              </p>
            </div>
          </div>
        </section>
        <section className="hidden sm:block text-center py-10 space-x-10">
          <button
            disabled={name.length < 4 ? true : false}
            onClick={handleDownload}
            type="button"
            className={`text-white ${
              name.length < 4 ? "bg-gray-400" : "bg-[#45AAF8]"
            } hover:${
              name.length < 4 ? "bg-gray-500" : "bg-blue-800"
            } focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2`}
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
              className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
              style={{
                boxShadow:
                  "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}
            >
              Back
            </button>
          </a>
        </section>
        <img
          className="sm:hidden sm:translate-x-[85vw] sm:translate-y-[-65vh] md:translate-y-[-65vh] lg:translate-y-[-85vh] sm:bottom-[75vh] sm:left-[92%]  w-[60px] sm:w-20 z-[-1] opacity-75"
          src="ball1.png"
        />
        <img
          className="absolute  w-[60px] sm:w-20 z-[-1] opacity-75
          left-[90vw]
          top-[85vh]
          sm:left-[10vw]
          sm:top-[80vh]
          max-[415px]:top-[85vh]
          lg:left-[70vw]
          lg:top-[80vh]
          md:left-[85vw]
          md:top-[10vh]
          "
          src="ball1.png"
        />
        <img
          className="absolute  w-[60px] sm:w-20 z-[-1] opacity-75
          left-[90vw]
          top-[85vh]
          sm:left-[10vw]
          sm:top-[80vh]
          max-[415px]:top-[85vh]
          lg:left-[90vw]
          lg:top-[10vh]
          md:left-[85vw]
          md:top-[10vh]
          "
          src="ball1.png"
        />
        {/* <img
          className="translate-x-[90vw] translate-y-[-80vh] md:translate-x-[5vw] md:translate-y-[-20vh] bottom-[60%] md:left-10 md:bottom-40 w-16 md:w-24 z-[-1] opacity-100"
          src="ball2.png"
        /> */}
        <img
          className="absolute w-16 md:w-24 z-[-1] opacity-100
          left-[90vw]
          top-[55vh]
          sm:left-[10vw]
          sm:top-[80vh]
          max-[415px]:top-[25vh]
          lg:left-[10vw]
          lg:top-[70vh]
          md:left-[10vw]
          md:top-[60vh]
          "
          src="ball2.png"
        />
        <img
          className="absolute -left-3 w-16 bottom-[62%] z-[-1] opacity-75"
          src="ball3.png"
        />
        {/* <img
          id="ball4"
          className=" translate-x-[80vw] translate-y-[-55vh] sm:translate-x-[10vw] sm:translate-y-[-15vh] max-[415px]:translate-y-[-65vh]  lg:translate-x-[35vw] lg:translate-y-[-40vh]
          md:translate-x-[80vw] md:translate-y-[-15vh] md:block left-[32%] bottom-60 w-12 sm:w-32 z-[-1] opacity-75"
          src="ball4.png"
        /> */}
        <img
          id="ball4"
          className="absolute md:block w-20 sm:w-32 z-[-1] opacity-75
          left-[80vw]
          top-[35vh]
          sm:left-[10vw]
          sm:top-[80vh]
          max-[415px]:top-[37vh]
          lg:left-[45vw]
          lg:top-[50vh]
          md:left-[40vw]
          md:top-[60vh]
          "
          src="ball4.png"
        />
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

      {/* <div
        id="dismiss-toast"
        className="
        hs-removing:opacity-0 transition duration-300
        max-w-xs bg-yellow-500 text-sm text-white rounded-md shadow-lg absolute top-0 right-0"
        role="alert">
        <div className="flex p-4">
          Hello, world! This is a toast message.
          <div className="ml-auto">
            <button
              data-hs-remove-element="#dismiss-toast"
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-800 focus:ring-yellow-500 transition-all text-sm dark:focus:ring-offset-yellow-500 dark:focus:ring-yellow-700">
              <span className="sr-only">Close</span>
              <svg
                className="w-3.5 h-3.5"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
export default TextDetect;
