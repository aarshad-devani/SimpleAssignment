import React, { useRef, useState } from "react";
import Box from "./Components/Box";
import "./App.css";

const BOX_HEIGHT = 100;
const BOX_WIDTH = 100;
const BOXES = 100;

// const GetAdjacentBoxes = (boxNumber: number, noOfBoxesInRow: number, noOfBoxesInColumn: number) => {
//   const cornerValuesIndexes = [0, noOfBoxesInRow - 1, 99, 90]; // Grid corner Numbers [top left, top right, bottom right, bottom left]
//   const LeftMostColumnLineIndexes = [...Array(noOfBoxesInColumn).keys()];
//   const RightMostColumnLineIndexes = [...Array(noOfBoxesInColumn).keys()];
// };

export default function App() {
  const [boxNumber] = useState<number>(BOXES);
  const boxRefs = useRef<any[]>([]);

  const GetBoxRef = (boxNumber: number) => boxRefs.current[boxNumber];
  const onBoxClick = (boxNumber: number) => {
    console.log("Box Clicked", boxNumber);
    const currentBox = GetBoxRef(boxNumber);
    const adjacentBoxRef = GetBoxRef(boxNumber + 1);

    currentBox && currentBox.changeColor && currentBox.changeColor();
    adjacentBoxRef && adjacentBoxRef.changeColor && adjacentBoxRef.changeColor();
  };

  return (
    <div className="full-Box">
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
