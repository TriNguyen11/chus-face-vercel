"use client";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function Home() {
  //download file to device
  function DownloadToDevice(fileurl) {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileurl);
    xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
    xhr.onload = function () {
      blob = xhr.response; //xhr.response is now a blob object
      console.log(blob);
      var storageLocation = "";
      switch (device.platform) {
        case "Android":
          storageLocation = "file:///storage/emulated/0/";
          break;
        case "iOS":
          storageLocation = cordova.file.documentsDirectory;
          break;
      }
      var folderpath = storageLocation + "Download";
      var filename = "Myimg.png";
      var DataBlob = blob;
      window.resolveLocalFileSystemURL(folderpath, function (dir) {
        dir.getFile(filename, { create: true }, function (file) {
          file.createWriter(
            function (fileWriter) {
              fileWriter.write(DataBlob);
              //Download was succesfull
            },
            function (err) {
              // failed
              console.log(err);
            }
          );
        });
      });
    };
    xhr.send();
  }

  return
}
