"use client";
import dynamic from "next/dynamic";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center container-md mx-auto md:mt-5 h-[100vh] w-[100vw]">
      <UploadImage></UploadImage>
    </div>
  );
};

export default Home;
