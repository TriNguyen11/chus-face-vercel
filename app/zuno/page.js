"use client";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function Home() {
  function openInNewTab(url) {
    // If WebKit message handler is available, send the message through it to Cordova application
    if (
      window.webkit &&
      webkit.messageHandlers &&
      webkit.messageHandlers.cordova_iab
    ) {
      // This means we are in a Cordova WebView

      const data = {
        // Custom event name
        eventName: "open-external-url-in-new-tab",
        url: url,
      };

      // Send message to InAppBrowser event listener so that Cordova app can handle it.
      webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(data));
    } else {
      // Otherwise we are in normal browser so directly open in the new tab
      window.open(url, "_blank");
    }

    return false;
  }

  return (
    <div className="container-md">
      <a className="text-lg text-black" href="#" onClick={() => openInNewTab("https://chus-face.vercel.app")}>
        Nhảy trang
      </a>
    </div>
  );
}
