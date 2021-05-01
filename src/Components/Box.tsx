import React, { useState, useImperativeHandle, forwardRef } from "react";
import { GetRandomColor } from "../Utils";

interface BoxProps {
  height: number;
  width: number;
  boxNumber?: number;
  onBoxClick: () => void;
}

interface ColorableRef {
  changeColor: () => void;
  setColor: (color: string) => void;
}

const Box = forwardRef<ColorableRef, BoxProps>(
  ({ height, width, children, boxNumber, onBoxClick }, ref) => {
    const [backgroundColor, setBackgroundColor] = useState<string>(GetRandomColor());

    const ChangeBoxColor = () => {
      const newColor = GetRandomColor();
      console.log("Changing Color of box", boxNumber);
      console.debug("Existing Color", backgroundColor);
      console.debug("newColor", newColor);
      setBackgroundColor(newColor);
      return newColor;
    };

    useImperativeHandle(ref, () => ({
      changeColor: ChangeBoxColor,
      setColor: (color: string) => {
        setBackgroundColor(color || GetRandomColor());
      },
    }));

    return (
      <div style={{ width, height, backgroundColor }} onClick={onBoxClick}>
        {children}
      </div>
    );
  }
);

export default Box;
