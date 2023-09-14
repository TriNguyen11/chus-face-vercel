"use client";
import { Popover, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center container-md mx-auto h-[100vh] w-[100vw]">
      <UploadImage></UploadImage>
    </div>
  );
};

export default Home;
