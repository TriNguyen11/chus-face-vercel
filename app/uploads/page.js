"use client";
import { Popover, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  console.log("asd");
  return (
    <>
      <UploadImage></UploadImage>
      {/* zuno added */}
    </>
  );
};

export default Home;
