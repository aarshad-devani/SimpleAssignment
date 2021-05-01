import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const HandleResize = () => {
      console.debug("Resize window event Occured");
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", HandleResize);
    return () => {
      window.removeEventListener("resize", HandleResize);
    };
  });

  return {
    width: windowSize.width,
    height: windowSize.height,
  };
};

export const GetRandomColor = (): string => {
  let hexCode = "#";
  while (hexCode.length < 7) {
    hexCode += Math.round(Math.random() * 15).toString(16);
  }
  return hexCode;
};

type TwoDVector = {
  x: number;
  y: number;
  boxNumber: number;
};
export const FormBoxMatrix = (noOfBoxesInRow: number, noOfBoxesInColumn: number) => {
  let boxMatrix: TwoDVector[] = [];
  for (let i = 0; i < noOfBoxesInColumn; i++) {
    for (let j = 0; j < noOfBoxesInRow; j++) {
      boxMatrix.push({
        x: j,
        y: i,
        boxNumber: j + i * noOfBoxesInColumn,
      });
    }
  }
  return boxMatrix;
};

export const GetVectorCoordinate = (
  boxNumber: number,
  noOfBoxesInRow: number,
  noOfBoxesInColumn: number
) => ({
  x: boxNumber % noOfBoxesInRow,
  y: Math.floor(boxNumber / noOfBoxesInColumn),
});

/**
 * Gets Adjacent Boxes based on current Box
 * @param boxNumber Box Number
 * @param noOfBoxesInRow Total Number of Boxes in a row
 * @param noOfBoxesInColumn Total Number of Boxes in a column
 */
export const GetAdjacentBoxes = (
  boxNumber: number,
  noOfBoxesInRow: number,
  noOfBoxesInColumn: number
) => {
  // const formBoxMatrix = FormBoxMatrix(noOfBoxesInRow, noOfBoxesInColumn);
  // const boxInformation = formBoxMatrix.find((x) => x.boxNumber === boxNumber);

  // Get  Box position in Matrix
  // Get Top, Left, Bottom, Right Boxes
  // Return the boxes which are valid

  const cornerValuesIndexes = [
    0,
    noOfBoxesInRow - 1,
    noOfBoxesInRow * noOfBoxesInColumn - 1,
    noOfBoxesInRow * noOfBoxesInColumn - noOfBoxesInRow,
  ]; // Grid corner Numbers [top left, top right, bottom right, bottom left]

  //   console.log("LeftMostColumnLineIndexes", LeftMostColumnLineIndexes);
  //   console.log("RightMostColumnLineIndexes", RightMostColumnLineIndexes);
  console.log("cornerValuesIndexes", cornerValuesIndexes);
};
