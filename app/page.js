"use client";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import Modal from "./components/Modal";
import { translation } from "./utils/translate";

export default function Home() {
  const [isChangedLang, setIsChangedLang] = useState(false);
  const [isWebview, setIsWebview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const l = window.localStorage.getItem("lang");
      const tranData = translation[l];
      for (const t in tranData) {
        const elements = window.document.getElementsByClassName(t);
        if (elements.length > 0)
          for (let i = 0; i < elements.length; i++)
            elements[i].innerHTML = tranData[t];
      }
    }
  }, [isChangedLang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkWebview = () => {
        const navigator = window.navigator;
        const userAgent = navigator.userAgent;
        const normalizedUserAgent = userAgent.toLowerCase();

        function isFacebookApp() {
          let ua = userAgent || navigator.vendor || window.opera;
          if (ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1) return true;
          return false;
        }

        const isAndroid = /android/.test(normalizedUserAgent);

        const isWebview =
          (isAndroid && /; wv\)/.test(normalizedUserAgent)) ||
          /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
            navigator.userAgent
          ) ||
          isFacebookApp();
        console.log(isWebview, 66);
        return isWebview;
      };

      if (checkWebview()) setIsWebview(true);
      // window.alert(
      //   "It's true! Open in external browser for the best experience\nMở bằng trình duyệt để có trải nghiệm tốt nhất!"
      // );
    }
  }, []);

  return (
    <>
      {typeof window !== "undefined" && (
        <section className="bg-chushead text-center text-white py-10 relative h-[15vh] md:h-[20vh]">
          <div
            className={`${
              window.localStorage.getItem("lang") === "en"
                ? "flex-row"
                : "flex-row-reverse"
            } h-[5vh] md:h-[10vh] flex justify-center items-center md:text-3xl text-lg text-center gap-2`}
          >
            <img className="w-[15vh]" src="logo-white.png" />
            <span className="header ml-4 mt-1">Playground</span>
          </div>
          <div className="absolute bottom-2 right-2 z-20">
            <Dropdown
              setIsChangedLang={() => setIsChangedLang(!isChangedLang)}
            />
          </div>
        </section>
      )}
      <div className="relative w-screen h-[85vh] md:h-[80vh] flex justify-center items-center">
        <section className="md:-mt-[10vh] md:w-[80%] relative flex flex-col md:flex-row gap-10 justify-between md:justify-around items-center">
          {typeof window !== "undefined" && (
            <>
              <div
                onClick={() => (window.location.href = "/text")}
                className={classNames(
                  "cursor-pointer flex flex-col items-center justify-between box-content md:w-[38vw] lg:w-[28vw] lg:h-[28vw] md:h-[45vw] md:px-8 px-2 py-4 rounded-xl",
                  `${
                    window.innerHeight / window.innerWidth <= 1.82
                      ? "w-[50vw] h-[50vw]"
                      : window.innerHeight / window.innerWidth <= 1.4
                      ? "w-[50vw] h-[40vw]"
                      : "w-[70vw] h-[70vw]"
                  }`
                )}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div>
                  <img className="w-[10vh] md:[15vh] " src="logo-black.png" />
                  <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[44px] ">
                    <span className="title1"></span>
                    <img
                      className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] absolute top-0 right-[-20px]"
                      src="hat.png"
                    />
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <a
                    className={classNames(
                      "flex justify-center items-center min-h-[50px] min-w-[50px] md:w-[30vw] md:h-[30vw] lg:h-[20vw] lg:w-[20vw] rounded-xl shadow-md bg-nguyen",
                      `${
                        window.innerHeight / window.innerWidth <= 1.82
                          ? "w-[35vw] h-[35vw]"
                          : window.innerHeight / window.innerWidth <= 1.4
                          ? "w-[30vw] h-[30vw]"
                          : "w-[50vw] h-[50vw]"
                      }`
                    )}
                    href="/text"
                  >
                    <div className="flex flex-col items-center md:space-y-2">
                      <div className="inline-flex justify-center items-center">
                        <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                          Nguyên
                        </span>
                        <img className="w-4 self-start" src="hat.png" />
                      </div>
                      <p className="slogan_text text-center text-white text-[6px] md:text-[10px] max-w-[100%]">
                        Craft with love, Shop with taste
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div
                onClick={() => {
                  if (typeof window !== "undefined")
                    window.location.href = "/uploads";
                }}
                className={classNames(
                  "cursor-pointer flex flex-col items-center justify-between box-content md:w-[38vw] lg:w-[28vw] lg:h-[28vw] md:h-[45vw] md:px-8 px-2 py-4 rounded-xl",
                  `${
                    window.innerHeight / window.innerWidth <= 1.82
                      ? "w-[50vw] h-[50vw]"
                      : window.innerHeight / window.innerWidth <= 1.4
                      ? "w-[50vw] h-[40vw]"
                      : "w-[70vw] h-[70vw]"
                  }`
                )}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div>
                  <img className="w-[10vh] md:[15vh] " src="logo-black.png" />
                  <span className="font-bold relative text-[20px] md:text-[40px] lg:text-[44px] ">
                    <span className="title2">Your Photo</span>
                    <img
                      className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] absolute top-0 right-[-20px]"
                      src="hat.png"
                    />
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <a
                    className={classNames(
                      "flex justify-center items-center min-h-[50px] min-w-[50px] md:w-[30vw] md:h-[30vw] lg:h-[20vw] lg:w-[20vw] rounded-xl shadow-md bg-nguyen",
                      `${
                        window.innerHeight / window.innerWidth <= 1.82
                          ? "w-[35vw] h-[35vw]"
                          : window.innerHeight / window.innerWidth <= 1.4
                          ? "w-[30vw] h-[30vw]"
                          : "w-[50vw] h-[50vw]"
                      }`
                    )}
                    href="/uploads"
                  >
                    <img
                      className=" self-start h-[100%] w-[100%] object-cover"
                      src="demo.png"
                    />
                  </a>
                </div>
              </div>
            </>
          )}

          {typeof window !== "undefined" && window.innerWidth < 500 && (
            <div className="absolute flex flex-row justify-center items-center z-[-2] w-full h-full ">
              <img
                className="max-[415px]:bottom-[35vh]  m-auto w-[60vh] min-w-[150px] max-[800px]:w-[40vh] max-[450px]:w-[20vh]  max-w-[300px] md:max-w-[580px]  z-[-1] md:opacity-60 opacity-30  object-contain"
                src="mascos.png"
              />
            </div>
          )}
        </section>

        {typeof window !== "undefined" && window.innerWidth > 500 && (
          <div className="flex flex-row justify-center absolute opacity-25 z-[-2] w-[100vw] h-[100vh]">
            <img
              className="absolute md:bottom-[5vh] bottom-[15vh] max-[415px]:bottom-[35vh] m-auto w-[60vh] min-w-[200px] max-[800px]:w-[40vh] max-[450px]:w-[20vh] max-w-[300px] md:max-w-[400px] z-[-1] md:opacity-30 object-contain"
              src="mascos.png"
            />
          </div>
        )}
        <img
          className="absolute md:left-40 left-[80vw] bottom-[50vh] md:bottom-10 w-20 z-[-3] opacity-25"
          src="ball1.png"
        />
        {/* <img
          className="z-[-3] transform translate-y-[2vh] sm:translate-y-[10vh] md:translate-y-[5vh] lg:translate-y-[2vh]  translate-x-[80vw]  sm:right-10 -right-10 bottom-60 w-24 sm:w-36 opacity-25"
          src="ball2.png"
        /> */}
        <img
          className="absolute -left-5 bottom-80 sm:bottom-40 sm:w-40 w-20 z-[-4] opacity-25"
          src="ball3.png"
        />
        <img
          className=" absolute z-[-3] bottom-10 right-0 sm:right-60 sm:bottom-40 w-20 sm:w-40 opacity-25"
          src="ball4.png"
        />
      </div>

      {isWebview && <Modal close={() => setIsWebview(false)} />}
    </>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
