"use client";
import "cropperjs/dist/cropper.css";

export default function Home() {
  const handleBlob = () => {
    const myImage = document.querySelector("img");

    const myRequest = new Request("zuno.png");

    fetch(myRequest)
      .then((response) => response.blob())
      .then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob);
        console.log(objectURL, 55);
      });
  };
  return (
    <div className="container-md">
      <a className="text-lg text-black" href="#" onClick={handleBlob}>
        Nhảy trang
      </a>
    </div>
  );
}
