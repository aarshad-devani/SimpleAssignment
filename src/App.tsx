import React, { useRef, useState } from "react";
import Box from "./Components/Box";
import { FormData } from "./Components/BoxForm";
import { GetAdjacentMatrices, useWindowSize, GetVectorCoordinate } from "./Utils";
import "./App.css";

const BOX_SIZE = 100;

export default function App() {
  const { width, height } = useWindowSize();
  const [formInformation] = useState<FormData>({
    boxSize: BOX_SIZE.toString(),
    dynamic: false,
    noOfRowBoxes: "10",
    noOfColumnBoxes: "10",
  });
  const possibleBoxesInWidth = formInformation.dynamic
    ? Math.floor(width / Number(formInformation.boxSize))
    : Number(formInformation.noOfRowBoxes);
  const possibleBoxesInHeight = formInformation.dynamic
    ? Math.floor(height / Number(formInformation.boxSize))
    : Number(formInformation.noOfColumnBoxes);

  const possibleBoxes = possibleBoxesInHeight * possibleBoxesInWidth;
  const boxRefs = useRef<any>({});
  boxRefs.current = {}; // setting it to empty array.. so on each render cycle refs are reset

  const GetBoxRef = (boxNumber: string) => boxRefs.current[boxNumber];
  const onBoxClick = (boxNumber: number) => {
    console.log("Box Clicked", boxNumber);
    const vectorCoordinate = GetVectorCoordinate(
      boxNumber,
      possibleBoxesInWidth,
      possibleBoxesInHeight
    );
    const adjacentCoordinates = GetAdjacentMatrices(
      boxNumber,
      possibleBoxesInWidth,
      possibleBoxesInHeight
    );
    const currentBox = GetBoxRef(`${vectorCoordinate.x}-${vectorCoordinate.y}`);
    const newColor = currentBox && currentBox.changeColor && currentBox.changeColor();

    console.log("currentVector", vectorCoordinate);
    console.log("adjacentVectors", adjacentCoordinates);

    adjacentCoordinates.forEach((matrix) => {
      const adjacentBoxRef = GetBoxRef(`${matrix.x}-${matrix.y}`);
      adjacentBoxRef && adjacentBoxRef.setColor && adjacentBoxRef.setColor(newColor);
    });
  };

  return (
    <div className="full-Box">
      {/* <div className="formBox">
        <BoxForm
          onFormSubmit={(data) => {
            setFormInformation(data);
            console.log(data);
          }}
        />
      </div> */}
      {[...Array(possibleBoxes).keys()].map((x: number) => {
        const vectorCoordinate = GetVectorCoordinate(
          x,
          possibleBoxesInWidth,
          possibleBoxesInHeight
        );
        const vectorString = `${vectorCoordinate.x}-${vectorCoordinate.y}`;

        return (
          <Box
            ref={(ele) => {
              boxRefs.current[vectorString] = ele;
            }}
            key={x}
            height={Number(formInformation.boxSize)}
            width={Number(formInformation.boxSize)}
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
