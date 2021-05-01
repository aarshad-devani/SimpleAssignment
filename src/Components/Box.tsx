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
}

const Box = forwardRef<ColorableRef, BoxProps>(
  ({ height, width, children, boxNumber, onBoxClick }, ref) => {
    const [backgroundColor, setBackgroundColor] = useState<string>(GetRandomColor());

    const ChangeBoxColor = () => {
      const newColor = GetRandomColor();
      console.debug("Changing Color of box", boxNumber);
      console.debug("Existing Color", backgroundColor);
      console.debug("newColor", newColor);
      setBackgroundColor(newColor);
    };

    useImperativeHandle(ref, () => ({
      changeColor: ChangeBoxColor,
    }));

    return (
      <div style={{ width, height, backgroundColor }} onClick={onBoxClick}>
        {children}
      </div>
    );
  }
);

// export const Box: React.FC<BoxProps> = (props, ref) => {
//   const [backgroundColor, setBackgroundColor] = useState<string>(GetRandomColor());

//   const BoxClick = () => {
//     setBackgroundColor(GetRandomColor());
//     props.onBoxClick();
//   };

//   useImperativeHandle(ref, () => ({
//     changeColor: BoxClick,
//   }));

//   return (
//     <div style={{ width: props.width, height: props.height, backgroundColor }} onClick={BoxClick}>
//       {props.children}
//     </div>
//   );
// };

export default Box;
