"use client";
// import HomePage from "./HomePage";
// let img, input, previewBlock, imagePreview, parentCanvas, canvas;
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  // return <HomePage></HomePage>;
  return <NoSSRComponent />;
}
