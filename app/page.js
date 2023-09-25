"use client";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import { translation } from "./utils/translate";

export default function Home() {
  const [isChangedLang, setIsChangedLang] = useState(false);

  useEffect(() => {
    const l = window.localStorage.getItem("lang");
    const tranData = translation[l];
    for (const t in tranData) {
      const elements = window.document.getElementsByClassName(t);
      if (elements.length > 0)
        for (let i = 0; i < elements.length; i++)
          elements[i].innerHTML = tranData[t];
    }
  }, [isChangedLang]);

  return (
    <>
      <div className="absolute left-2">
        <Dropdown
          background="bg-gray-50"
          setIsChangedLang={() => setIsChangedLang(!isChangedLang)}
        />
      </div>
      <section className="bg-chushead text-center text-white py-10 space-y-4">
        <div className="flex md:justify-center md:items-start flex-col md:flex-row items-center md:text-3xl text-lg text-center ">
          <span className="header uppercase md:mr-4 mr-0">PLAY WITH</span>
          <img className="w-[15vh]" src="logo-white.png" />
        </div>
      </section>
      <div className="w-screen h-[85vh] flex justify-center items-center">
        <section className="relative flex flex-col md:flex-row gap-8 sm:justify-center md:justify-around items-center">
          <div
            onClick={() => {
              window.location.href = "/text";
            }}
            className="cursor-pointer flex flex-col items-center justify-between box-content w-[55vw] lg:w-[25vw] h-[55vw] lg:h-[25vw] md:px-8 px-2 py-4 rounded-xl"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <div>
              <p className="header text-[12px] md:text-[20px] mt-2 sm:ml-0">
                Play With
              </p>
              <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[44px] ">
                <span className="title1"></span>
                <img
                  className="w-[18px] h-[18px] md:w-[30px] md:h-[34px] absolute top-0 right-[-20px]"
                  src="hat.png"
                />
              </span>
            </div>
            <div className="flex justify-center w-full h-[100%] items-center">
              <a
                className="flex justify-center items-center h-[35vw] min-h-[50px] min-w-[50px] w-[35vw] lg:h-[15vw] lg:w-[15vw] rounded-xl shadow-md bg-nguyen"
                href="/text"
              >
                <div className="flex flex-col items-center md:space-y-2">
                  <div className="inline-flex justify-center items-center">
                    <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                      Nguyên
                    </span>
                    <img className="w-4 self-start" src="hat.png" />
                  </div>
                  <p className="text-center text-white text-[6px] md:text-[10px] max-w-[100%]">
                    Craft with love, Shop with taste
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div
            onClick={() => {
              window.location.href = "/uploads";
            }}
            className="cursor-pointer relative flex flex-col items-center justify-between box-content w-[55vw] lg:w-[25vw] h-[55vw] lg:h-[25vw] md:px-8 px-2 py-4 rounded-xl"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <div>
              <p className="header text-[12px] md:text-[20px] mt-2 sm:ml-0">
                Play With
              </p>
              <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[44px] ">
                <span className="title2">Your Photo</span>
                <img
                  className="w-3 self-start absolute top-0 right-[-20px]"
                  src="hat.png"
                />
              </span>
            </div>
            <div className="flex justify-center w-full h-[100%] items-center">
              <a
                className="flex justify-center items-center h-[35vw] w-[35vw] lg:h-[15vw] lg:w-[15vw] min-w-[50px] min-h-[50px] "
                href="/uploads"
              >
                <img
                  className=" self-start h-[100%] w-[100%] object-cover "
                  src="demo.png"
                />
              </a>
            </div>
          </div>
          {typeof window !== "undefined" && window.innerWidth < 500 && (
            <div className="absolute flex flex-row justify-center items-center  z-[-2] w-full h-full ">
              <img
                className="max-[415px]:bottom-[35vh]  m-auto w-[60vh] min-w-[150px] max-[800px]:w-[40vh] max-[450px]:w-[20vh]  max-w-[300px] md:max-w-[580px]  z-[-1] md:opacity-60 opacity-30  object-contain"
                src="mascos.png"
              />
            </div>
          )}
        </section>

        {/* {typeof window !== "undefined" && window.innerWidth > 500 && (
        <div className="flex flex-row justify-center absolute opacity-25 z-[-2] w-[100vw] h-[100vh]">
          <img
            className="absolute md:bottom-[5vh] bottom-[15vh] max-[415px]:bottom-[35vh] m-auto w-[60vh] min-w-[200px] max-[800px]:w-[40vh] max-[450px]:w-[20vh] max-w-[300px] md:max-w-[400px] z-[-1] md:opacity-95 object-contain"
            src="mascos.png"
          />
        </div>
      )} */}
        {/* <img
        className="absolute md:left-40 left-[80vw] bottom-[50vh] md:bottom-10 w-20 z-[-3] opacity-25"
        src="ball1.png"
      />
      <img
        className="z-[-3] transform translate-y-[2vh] sm:translate-y-[10vh] md:translate-y-[5vh] lg:translate-y-[2vh]  translate-x-[80vw]  sm:right-10 -right-10 bottom-60 w-24 sm:w-36 opacity-25"
        src="ball2.png"
      />
      <img
        className="absolute -left-10 bottom-60 sm:bottom-40 sm:w-40 w-20 z-[-4] opacity-25"
        src="ball3.png"
      />
      <img
        className="z-[-3] bottom-0 right-10 sm:right-60  transform translate-y-[25vh] sm:translate-y-[10vh] md:translate-y-[20vh] lg:translate-y-[5vh]  translate-x-[60vw] sm:translate-x-[70vw] w-36 sm:w-40 opacity-25"
        src="ball4.png"
      /> */}
      </div>
    </>
  );
}
