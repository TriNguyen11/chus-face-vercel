"use client";
import Dropdown from "./components/Dropdown";
// let img, input, previewBlock, imagePreview, parentCanvas, canvas;
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container-lg mx-auto flex flex-col h-screen overflow-hidden">
      <div className="absolute top-4 left-4">
        <Dropdown />
      </div>
      <section className="bg-chushead text-center text-white md:py-10 pt-[8vh] pb-[4vh] space-y-4">
        <div className="flex md:justify-center md:items-end flex-col md:flex-row items-center md:text-3xl text-2xl text-center ">
          <span className=" md:mr-4 mr-0">PLAY WITH</span>
          <img className="w-[25vh]" src="logo-white.png" />
        </div>
        <div className="md:flex justify-center items-end text-md hidden  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 44 44"
            fill="none"
            className="fill-white">
            <path
              d="M6.875 5.5C6.51033 5.5 6.16059 5.64487 5.90273 5.90273C5.64487 6.16059 5.5 6.51033 5.5 6.875C5.5 7.23967 5.64487 7.58941 5.90273 7.84727C6.16059 8.10513 6.51033 8.25 6.875 8.25H7.5515C7.85007 8.25052 8.14036 8.3482 8.3785 8.5283C8.61664 8.70839 8.78969 8.9611 8.8715 9.24825L13.233 24.5108C13.4797 25.3721 14.0001 26.1296 14.7155 26.669C15.431 27.2083 16.3026 27.5 17.1985 27.5H29.7632C30.5878 27.5001 31.3935 27.2531 32.0764 26.7909C32.7592 26.3287 33.2878 25.6724 33.594 24.9068L37.6475 14.7702C37.8141 14.3531 37.8761 13.9016 37.8279 13.455C37.7797 13.0084 37.6229 12.5805 37.3711 12.2085C37.1193 11.8366 36.7803 11.5319 36.3836 11.3213C35.9869 11.1106 35.5447 11.0003 35.0955 11H12.232L11.5142 8.492C11.2682 7.63063 10.7484 6.87276 10.0335 6.33297C9.31855 5.79317 8.44733 5.50078 7.5515 5.5H6.875ZM15.8785 23.7518L13.0185 13.75H35.0927L31.0392 23.8865C30.9371 24.1414 30.761 24.3599 30.5336 24.5138C30.3061 24.6677 30.0378 24.7499 29.7632 24.75H17.1985C16.8999 24.7495 16.6096 24.6518 16.3715 24.4717C16.1334 24.2916 15.9603 24.0389 15.8785 23.7518ZM17.875 38.5C18.4167 38.5 18.9531 38.3933 19.4536 38.186C19.954 37.9787 20.4088 37.6749 20.7918 37.2918C21.1749 36.9088 21.4787 36.454 21.686 35.9536C21.8933 35.4531 22 34.9167 22 34.375C22 33.8333 21.8933 33.2969 21.686 32.7964C21.4787 32.296 21.1749 31.8412 20.7918 31.4582C20.4088 31.0751 19.954 30.7713 19.4536 30.564C18.9531 30.3567 18.4167 30.25 17.875 30.25C16.781 30.25 15.7318 30.6846 14.9582 31.4582C14.1846 32.2318 13.75 33.281 13.75 34.375C13.75 35.469 14.1846 36.5182 14.9582 37.2918C15.7318 38.0654 16.781 38.5 17.875 38.5ZM17.875 35.75C17.5103 35.75 17.1606 35.6051 16.9027 35.3473C16.6449 35.0894 16.5 34.7397 16.5 34.375C16.5 34.0103 16.6449 33.6606 16.9027 33.4027C17.1606 33.1449 17.5103 33 17.875 33C18.2397 33 18.5894 33.1449 18.8473 33.4027C19.1051 33.6606 19.25 34.0103 19.25 34.375C19.25 34.7397 19.1051 35.0894 18.8473 35.3473C18.5894 35.6051 18.2397 35.75 17.875 35.75ZM28.875 38.5C29.4167 38.5 29.9531 38.3933 30.4536 38.186C30.954 37.9787 31.4088 37.6749 31.7918 37.2918C32.1749 36.9088 32.4787 36.454 32.686 35.9536C32.8933 35.4531 33 34.9167 33 34.375C33 33.8333 32.8933 33.2969 32.686 32.7964C32.4787 32.296 32.1749 31.8412 31.7918 31.4582C31.4088 31.0751 30.954 30.7713 30.4536 30.564C29.9531 30.3567 29.4167 30.25 28.875 30.25C27.781 30.25 26.7318 30.6846 25.9582 31.4582C25.1846 32.2318 24.75 33.281 24.75 34.375C24.75 35.469 25.1846 36.5182 25.9582 37.2918C26.7318 38.0654 27.781 38.5 28.875 38.5ZM28.875 35.75C28.5103 35.75 28.1606 35.6051 27.9027 35.3473C27.6449 35.0894 27.5 34.7397 27.5 34.375C27.5 34.0103 27.6449 33.6606 27.9027 33.4027C28.1606 33.1449 28.5103 33 28.875 33C29.2397 33 29.5894 33.1449 29.8473 33.4027C30.1051 33.6606 30.25 34.0103 30.25 34.375C30.25 34.7397 30.1051 35.0894 29.8473 35.3473C29.5894 35.6051 29.2397 35.75 28.875 35.75Z"
              fill=""
            />
          </svg>
          <span
            className="cursor-pointer"
            onClick={() => window.open("https://chus.vn", "_blank")}>
            {" "}
            Shop At CHUS
          </span>
        </div>
      </section>
      <section className="relative flex md:justify-around flex-col md:flex-row items-center mt-16 px-5">
        <div
          onClick={() => {
            window.location.href = "/text";
          }}
          className=" cursor-pointer flex flex-col items-center justify-between box-content  w-[35vw] lg:w-[25vw] h-[35vw] lg:h-[25vw]  md:px-8 px-2 py-4 rounded-xl "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            backdropFilter: "blur(10px)",
            // filter: "blur(1.1px)",
            WebkitBackdropFilter: "blur(10px)",
          }}>
          <div>
            <p className="text-[12px] md:text-[20px] mt-2 sm:ml-0">Play With</p>
            <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[50px] ">
              Your Name
              <img
                className="w-3 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
          <div className="flex justify-center w-full h-[100%] items-center">
            <a
              className="flex justify-center items-center h-[20vw] min-h-[50px] min-w-[50px] w-[20vw] lg:h-[15vw] lg:w-[15vw] rounded-xl shadow-md bg-nguyen"
              href="/text">
              <div className="flex justify-center items-center">
                <span className="font-bold text-[12px] sm:text-3xl">
                  nguyên
                </span>
                <img className="w-2 self-start " src="hat.png" />
              </div>
            </a>
          </div>
        </div>

        <div
          onClick={() => {
            window.location.href = "/uploads";
          }}
          className=" cursor-pointer relative flex flex-col items-center justify-between box-content w-[35vw] lg:w-[25vw] h-[35vw] lg:h-[25vw]  md:px-8 px-2 py-4 rounded-xl mt-[12vh] md:mt-0 "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}>
          <div>
            <p className="text-[12px] md:text-[20px] mt-2 sm:ml-0">Play With</p>
            <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[50px] ">
              Your Image
              <img
                className="w-3 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
          <div className="flex justify-center w-full h-[100%] items-center">
            <a
              className="flex justify-center items-center h-[20vw] w-[20vw]  lg:h-[15vw] lg:w-[15vw] min-w-[50px] min-h-[50px] "
              href="/uploads">
              <img
                className=" self-start h-[100%] w-[100%] object-cover "
                src="demo.png"
              />
            </a>
          </div>
        </div>
      </section>
      <div
        style={{}}
        className="flex flex-row justify-center absolute z-[-2] w-[100vw] h-[100vh]">
        <img
          className="absolute md:bottom-[5vh] bottom-[15vh] max-[415px]:bottom-[35vh]  m-auto w-[60vh] min-w-[200px] max-[800px]:w-[40vh] max-[450px]:w-[20vh]  max-w-[300px] md:max-w-[580px]  z-[-1] md:opacity-95 opacity-30  object-contain"
          src="mascos.png"
        />
      </div>

      <img
        className="absolute md:left-40 left-[80vw] bottom-[50vh] md:bottom-10 w-20 z-[-3] opacity-50"
        src="ball1.png"
      />
      <img
        className="z-[-3] transform  translate-y-[2vh] sm:translate-y-[10vh] md:translate-y-[5vh] lg:translate-y-[2vh]  translate-x-[80vw]  sm:right-10 -right-10 bottom-60 w-24 sm:w-36  opacity-75"
        src="ball2.png"
      />
      <img
        className=" absolute -left-10 bottom-60 sm:bottom-40 sm:w-40 w-36 z-[-4] opacity-75"
        src="ball3.png"
      />
      <img
        className=" z-[-3] bottom-0 right-10 sm:right-60  transform translate-y-[25vh] sm:translate-y-[10vh] md:translate-y-[20vh] lg:translate-y-[5vh]  translate-x-[60vw] sm:translate-x-[70vw] w-36 sm:w-40  opacity-75"
        src="ball4.png"
      />
    </div>
  );
}
