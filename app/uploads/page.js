"use client";
import dynamic from "next/dynamic";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center w-screen h-screen space-y-8 md:space-y-2">
      <UploadImage></UploadImage>
    </div>
  );
};

export default Home;
