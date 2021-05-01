import React, { useRef, useState } from "react";
import Box from "./Components/Box";
import BoxForm, { FormData } from "./Components/BoxForm";
import { GetAdjacentBoxes } from "./Utils";
import "./App.css";

const BOX_HEIGHT = 100;
const BOX_WIDTH = 100;
const BOXES = 100;

export default function App() {
  const [boxNumber] = useState<number>(BOXES);
  const boxRefs = useRef<any[]>([]);

  const GetBoxRef = (boxNumber: number) => boxRefs.current[boxNumber];
  const onBoxClick = (boxNumber: number) => {
    GetAdjacentBoxes(boxNumber, 10, 10);
    console.log("Box Clicked", boxNumber);
    const currentBox = GetBoxRef(boxNumber);
    const adjacentBoxRef = GetBoxRef(boxNumber + 1);

    currentBox && currentBox.changeColor && currentBox.changeColor();
    adjacentBoxRef && adjacentBoxRef.changeColor && adjacentBoxRef.changeColor();
  };

  return (
    <div className="full-Box">
      <div className="formBox">
        <BoxForm
          onFormSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
      {[...Array(boxNumber).keys()].map((x: number) => {
        const getRef = (element: any) => boxRefs.current.push(element);
        return (
          <Box
            ref={getRef}
            key={x}
            height={BOX_HEIGHT}
            width={BOX_WIDTH}
            boxNumber={x}
            onBoxClick={() => {
              onBoxClick(x);
            }}
          />
        );
      })}
    </div>
  );
}
