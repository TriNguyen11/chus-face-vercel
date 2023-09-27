"use client";
import dynamic from "next/dynamic";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  if (typeof window !== "undefined") {
    if (window.navigator.userAgent.indexOf("cordova") !== -1) {
      // do something here
      window.openUrl(window.location.href, "_system");
    } else {
      console.log("ko phai webapp", window.location.href);
    }
  }
  return (
    <div className="relative flex flex-col justify-center w-screen h-screen space-y-8 md:space-y-2">
      <UploadImage></UploadImage>
    </div>
  );
};

export default Home;
