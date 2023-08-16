import Konva from "konva";
import React, { useEffect, useState } from "react";
import { Layer, Stage, Image, Transformer, Group } from "react-konva";
import useImage from "use-image";
var faceapi = require("/face-api.min");

const HomePage = () => {
  // let canvasToAdd = document.getElementsByTagName("canvas")[0];
  // const ctx = canvasToAdd.getContext("2d");
  const [selectedId, setSelectedId] = useState();
  const [arrayPos, setarrayPos] = useState([]);
  const [sizeCanvas, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });
  const initUploader = () => {
    const input = document.getElementById("file-input");
    const previewBlock = document.getElementById("img-preview-id");
    previewBlock.style.position = "relative";
    const imagePreview = document.getElementById("img-preview");

    // image & canvas
    let img;
    let canvas;

    input.addEventListener("change", async () => {
      imagePreview.remove();
      if (img) img.remove();
      if (canvas) canvas.remove();

      // preview image
      img = await faceapi.bufferToImage(input.files[0]);
      previewBlock.prepend(img);

      canvas = faceapi.createCanvasFromMedia(img);
      canvas.id = "id-canvas";
      const displaySize = { width: img.width, height: img.height };
      setSizeCanvas({ width: img.width, height: img.height });
      faceapi.matchDimensions(canvas, displaySize);
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      let arrPosTemp = [];
      resizeDetections.forEach((detection, index) => {
        const box = detection.detection.box;
        let addImgPng = document.createElement("img");
        // addImgPng.src = "./hat.png";
        // addImgPng.style.position = "absolute";
        // addImgPng.style.transform = "rotateZ(-40deg)";
        // addImgPng.style.objectFit = "contain";
        // addImgPng.id = index;
        // addImgPng.addEventListener("click", (e) => {
        //   setSelectedId(index);
        // });
        arrPosTemp.push({
          y: detection.detection.box.y - detection.detection.box.height / 4,
          x: detection.detection.box.x + detection.detection.box.width / 5,
          width: detection.detection.box.width / 2,
          height: detection.detection.box.height / 2,
          id: index,
        });
        // addImgPng.style.top =
        //   detection.detection.box.y - detection.detection.box.height / 2 + "px";
        // // detection.detection.box.y - detection.detection.box.y / 1.1 + "px";
        // addImgPng.style.left =
        //   detection.detection.box.x + detection.detection.box.width / 4 + "px";
        // // detection.detection.box.x + detection.detection.box.x / 12 + "px";
        // addImgPng.style.width = detection.detection.box.width / 2 + "px";
        // addImgPng.style.height = detection.detection.box.height / 2 + "px";
        // parentCanvas.append(addImgPng);

        // const drawBox = new faceapi.draw.DrawBox(box, {
        //   label: "asd",
        // });
        const hat = document.createElement("image");
        // img.src = "./CHUS_HAT.png";
        // drawBox.draw(canvas);
      });
      setarrayPos(arrPosTemp);
      // console.log(arrPosTemp, "arrPosTemp");
    });
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };
  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
    ]).then(() => initUploader());
  }, []);
  console.log(arrayPos, "arrayPos");

  return (
    <div className="container-2">
      <div id="img-preview-id" className="preview">
        <img htmlFor="file-input" id="img-preview" src="/zuno.png" />
        <label htmlFor="file-input">Upload Image</label>
        <input
          accept="image/*"
          type="file"
          id="file-input"
          onChange={() => {
            console.log(1);
          }}
        />

        <Stage
          className=""
          style={{
            position: "absolute",
            top: 0,
          }}
          id="container"
          width={sizeCanvas.width}
          height={sizeCanvas.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}>
          <Layer>
            {arrayPos.map((rect, i) => {
              return (
                <>
                  <Rectangle
                    key={i}
                    shapeProps={rect}
                    isSelected={i === selectedId}
                    onSelect={() => {
                      setSelectedId(i);
                    }}
                    onChange={(newAttrs) => {
                      const rects = arrayPos.slice();
                      rects[i] = newAttrs;
                      setarrayPos(rects);
                    }}
                  />
                </>
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [image] = useImage("hat.png");

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Group>
      <Image
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        rotation={-50}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          anchorCornerRadius={20}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

export default HomePage;
