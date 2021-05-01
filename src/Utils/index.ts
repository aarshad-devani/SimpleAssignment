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
};
export const FormBoxMatrix = (noOfBoxesInRow: number, noOfBoxesInColumn: number) => {
  let boxMatrix: TwoDVector[] = [];
  for (let i = 0; i < noOfBoxesInColumn; i++) {
    for (let j = 0; j < noOfBoxesInRow; j++) {
      boxMatrix.push({
        x: j,
        y: i,
        // boxNumber: j + i * noOfBoxesInColumn,
      });
    }
  }
  return boxMatrix;
};

export const GetVectorCoordinate = (
  boxNumber: number,
  noOfBoxesInRow: number,
  noOfBoxesInColumn: number
): TwoDVector => ({
  x: boxNumber % noOfBoxesInRow,
  y: Math.floor(boxNumber / noOfBoxesInColumn),
});

export const GetBoxNumberFromVector = (
  // 22
  boxvector: TwoDVector, // x: 0, y: 2
  noOfBoxesInRow: number, // 11
  noOfBoxesInColumn: number // 9
) => boxvector.y * noOfBoxesInColumn + boxvector.x;

/**
 * Gets Adjacent Boxes based on current Box
 * @param boxNumber Box Number
 * @param noOfBoxesInRow Total Number of Boxes in a row
 * @param noOfBoxesInColumn Total Number of Boxes in a column
 */
export const GetAdjacentMatrices = (
  boxNumber: number,
  noOfBoxesInRow: number,
  noOfBoxesInColumn: number
) => {
  // Get  Box position in Matrix
  const currentBox = GetVectorCoordinate(boxNumber, noOfBoxesInRow, noOfBoxesInColumn);
  // Get Top, Right, Bottom, Left Boxes
  const adjacentBoxes = [
    { ...currentBox, y: currentBox.y - 1 }, // above the current box
    { ...currentBox, x: currentBox.x + 1 }, // right side of current box
    { ...currentBox, y: currentBox.y + 1 }, // below current box
    { ...currentBox, x: currentBox.x - 1 }, // left side of current box
  ];
  console.debug("adjacentBoxes", adjacentBoxes);
  // Get the boxes which are valid and are within boundary
  return adjacentBoxes.filter((matrix: TwoDVector) => {
    return (
      matrix.x >= 0 &&
      matrix.x <= noOfBoxesInRow - 1 &&
      matrix.y >= 0 &&
      matrix.y <= noOfBoxesInColumn - 1
    );
  });

  // const cornerValuesIndexes = [
  //   0,
  //   noOfBoxesInRow - 1,
  //   noOfBoxesInRow * noOfBoxesInColumn - 1,
  //   noOfBoxesInRow * noOfBoxesInColumn - noOfBoxesInRow,
  // ]; // Grid corner Numbers [top left, top right, bottom right, bottom left]

  // //   console.log("LeftMostColumnLineIndexes", LeftMostColumnLineIndexes);
  // //   console.log("RightMostColumnLineIndexes", RightMostColumnLineIndexes);
  // console.log("cornerValuesIndexes", cornerValuesIndexes);
};
