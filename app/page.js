"use client";
// import HomePage from "./HomePage";
// let img, input, previewBlock, imagePreview, parentCanvas, canvas;
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  // return <HomePage></HomePage>;
  // return <NoSSRComponent />;
  return (
    <div className="container-wrapper text-3xl">
      <h1 style={{ marginBottom: "5vh" }}>Choose to play the game! </h1>
      <div className="text-detect">
        <a href="/text">Text</a>
      </div>
      <div className="image-detect">
        <a href="/uploads">Upload Image</a>
      </div>
    </div>
  );
}
