"use client";

import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TextDetect = () => {
  const [name, setName] = useState("");
  const checkValidInput = () => {
    // console.log(name, "check name");
    const specials = /^[a-zA-Z0-9]{4,10}$/;
    // console.log(specials.test(name), 3394949);
    return specials.test(name);
  };
  const notify = () =>
    toast.error(
      "From 4-10 Characters, no spceial characters like $,%,&,*,#,@,..."
    );
  const downloadImg = () => {
    htmlToImage
      .toJpeg(document.getElementById("ImageDownload"), {
        quality: 1,
      })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  const handleDownload = (e) => {
    if (!checkValidInput()) {
      return notify();
    }
    downloadImg();
  };

  return (
    <>
      {/* zuno added */}
      <div className="container-lg mx-auto h-screen ">
        <section className="text-center py-10 md:space-y-20  space-y-4 max-[415px]:py-0">
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
          <div className="flex flex-col md:flex-row  items-center justify-center mt-0">
            <p className="text-[40px] mt-2 ml-[-40%] sm:ml-0">Play With</p>
            <span className="font-bold relative text-[70px] md:text-[50px] ">
              Your Name
              <img
                className="w-6 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
        </section>
        <section className="grid sm:grid-cols-1 md:grid-cols-2 justify-around ">
          <div className="p-4">
            <input
              onChange={(e) => setName(e.target.value)}
              minLength="4"
              maxLength="10"
              type="text"
              className="p-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full"
              placeholder="Your name..."
            />
            <p className="text-xs p-4">
              From 4-10 Characters, no spceial characters like $,%,&,*,#,@,...
            </p>
            <div
              className="hidden md:flex  flex-col justify-center items-center relative bg-white
              ">
              <div className="mt-20 ">
                <span className="font-bold text-xl sm:text-7xl">nguyên</span>
              </div>
              <img
                className="w-10 self-start absolute top-10 right-2 lg:right-20"
                src="hat.png"
              />
              <p className="text-black mt-3 ">
                Craft with love, Shop with taste
              </p>
            </div>
          </div>
          <section className="sm:hidden flex justify-center text-center py-4 px-2">
            <button
              disabled={name.length < 4 ? true : false}
              onClick={handleDownload}
              type="button"
              className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
              style={{
                boxShadow:
                  "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}>
              Download
            </button>
            <a href="/">
              <button
                type="button"
                className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
                style={{
                  boxShadow:
                    "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                }}>
                Back
              </button>
            </a>
          </section>
          <div className="bg-white mx-auto">
            <div
              id="ImageDownload"
              className=" overflow-hidden flex flex-col justify-center items-center  col-span-7 box-content w-[43vh] h-[43vh] md:w-[48vw] md:h-[48vw] xl:w-[38vw] xl:h-[38vw] rounded-xl shadow bg-nguyen gap-4">
              {name && (
                <span
                  id="name"
                  className="font-bold text-[40px] md:text-5xl lg:text-[70px] xl:text-[72px]  text-white relative  ">
                  <img
                    className="w-10 self-start absolute -top-8 -right-12"
                    src="hat.png"
                  />
                  {name}
                </span>
              )}
              <p className="text-white -mt-6 md:-mt-4">
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
              name.length < 4 ? "bg-gray-200" : "bg-[#45AAF8]"
            } hover:${
              name.length < 4 ? "bg-gray-200" : "bg-blue-800"
            } focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2`}
            style={{
              boxShadow:
                "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            }}>
            Download
          </button>
          <a href="/">
            <button
              type="button"
              className="text-white bg-[#45AAF8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2"
              style={{
                boxShadow:
                  "(69,170,248) 0px 8px 24px, (69,170,248) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}>
              Back
            </button>
          </a>
        </section>
        <div className="h-5"></div>
        <img
          className="sm:translate-x-[85vw] sm:translate-y-[-60vh] md:translate-y-[-65vh] lg:translate-y-[-85vh] -left-2 bottom-[-10vh] sm:bottom-[75vh] sm:left-[92%]  w-[60px] sm:w-20 z-[-1] opacity-75"
          src="ball1.png"
        />
        <img
          className="absolute -right-3 bottom-[60%]  md:left-10 md:bottom-40 w-16 md:w-24 z-[-1] opacity-75"
          src="ball2.png"
        />
        <img
          className="absolute  -left-3 w-16  bottom-[62%]  z-[-1] opacity-75"
          src="ball3.png"
        />
        <img
          id="ball4"
          className=" translate-x-[80vw] translate-y-[-55vh] sm:translate-x-[10vw] sm:translate-y-[-15vh] max-[415px]:translate-y-[-65vh]  lg:translate-x-[35vw] lg:translate-y-[-40vh]  
          md:translate-x-[80vw] md:translate-y-[-15vh] md:block left-[32%] bottom-60 w-12 sm:w-32 z-[-1] opacity-75"
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
export default TextDetect;
