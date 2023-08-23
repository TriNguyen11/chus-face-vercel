"use client";

import html2canvas from "html2canvas";

const TextDetect = () => {
  return (
    <div className="container-wrapper">
      <div
        style={{
          position: "absolute",
          left: "5vw",
          top: "2vh",
        }}>
        <a id="href" href="/">
          <img
            src="/left2.png"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        </a>
      </div>
      <div
        className="container-wrapper-children"
        id="container-wrapper-children">
        <h1
          style={{
            marginBottom: "5vh",
            color: "black",
          }}>
          Enter name to play the game!{" "}
        </h1>
        <input
          id="input-text"
          maxlength="10"
          minlength="4"
          style={{ border: "1px solid lightgray" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.getElementById("name").textContent = e.target.value;
              document
                .getElementById("container-wrapper-children")
                .classList.add("display-none");
              document
                .getElementById("container-wrapper-children-2")
                .classList.remove("display-none");
              document.getElementById("href").href = "";
            }
          }}
        />
      </div>

      <div
        className="container-wrapper-children-2 display-none "
        id="container-wrapper-children-2">
        <h1
          style={{
            marginBottom: "5vh",
          }}>
          Result!{" "}
        </h1>
        <div
          id="ImageDownload"
          className="wrap-font"
          style={{
            backgroundColor: "white",
            width: "350px",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}>
          <p
            id="name"
            style={{
              fontSize: "48px",
              fontWeight: "bold",
            }}></p>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}>
            Craft with love, Shop with taste
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}>
            <img
              src="/hat.png"
              alt=""
              style={{
                width: "30px",
                height: "30px",
              }}
            />
          </div>
        </div>
        <div>
          {/* <button
            id="button_click"
            onClick={(e) => {
              html2canvas(document.getElementById("ImageDownload"), {
                proxy: "server.js",
                useCORS: true,
                onrendered: function (canvas) {
                  document.body.appendChild(canvas);
                },
              }).then((canvas) => {
                let a = document.createElement("a");
                a.download = "screenshot.jpeg";
                a.href = canvas.toDataURL("image/png");
                a.click();
              });
            }}>
            <a
              style={{
                color: "black",
              }}>
              download
            </a>
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default TextDetect;
