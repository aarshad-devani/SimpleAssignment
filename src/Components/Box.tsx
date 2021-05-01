import React, { useState, useImperativeHandle, forwardRef } from "react";
import { GetRandomColor } from "../Utils";

interface BoxProps {
  height: number;
  width: number;
  onBoxClick: () => void;
}

export const Box: React.FC<BoxProps> = forwardRef((props, ref) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(GetRandomColor());

  const BoxClick = () => {
    setBackgroundColor(GetRandomColor());
    props.onBoxClick();
  };

  useImperativeHandle(ref, () => ({
    changeColor: BoxClick,
  }));

  return (
    <div style={{ width: props.width, height: props.height, backgroundColor }} onClick={BoxClick}>
      {props.children}
    </div>
  );
});

export default React.memo(Box);
