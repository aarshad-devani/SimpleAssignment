import React, { useRef, useState } from "react";
import Box from "./Components/Box";
import "./App.css";

const BOX_HEIGHT = 100;
const BOX_WIDTH = 100;
const BOXES = 100;

export default function App() {
  const [boxNumber] = useState<number>(BOXES);
  const boxRefs = [...Array(boxNumber).keys()].map((x: number) => useRef<any>());

  const GetAdjacentBoxes = (boxNumber: number) => {};

  return (
    <div className="full-Box">
      {[...Array(100).keys()].map((x: number) => (
        <Box
          key={x}
          height={BOX_HEIGHT}
          width={BOX_WIDTH}
          onBoxClick={() => {
            console.log("Box Clicked", x);
          }}
        />
      ))}
    </div>
  );
}
