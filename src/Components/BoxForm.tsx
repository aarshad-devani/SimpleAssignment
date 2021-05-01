import React from "react";
import { useForm } from "react-hook-form";

export interface FormData {
  noOfRowBoxes: string;
  noOfColumnBoxes: string;
  dynamic: boolean;
  boxSize: string;
}

interface BoxFormProps {
  onFormSubmit: (data: FormData) => void;
}

export const BoxForm: React.FC<BoxFormProps> = (props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    props.onFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>No. of Boxes in Row : </span>
      <input
        id="noOfRowBoxes"
        defaultValue={10}
        type="number"
        placeholder="No of Boxes in Row"
        {...register("noOfRowBoxes")}
      />
      <br />
      <span>No. of Boxes in Column : </span>
      <input
        id="noOfColumnBoxes"
        defaultValue={10}
        type="number"
        placeholder="No of Boxes in column"
        {...register("noOfColumnBoxes")}
      />
      <br />
      <span>Box Size : </span>
      <input
        id="boxSize"
        defaultValue={100}
        type="number"
        placeholder="No of Boxes in column"
        {...register("boxSize")}
      />
      <br />
      <span>Dynamic Boxes : </span>
      <input id="dynamic" type="checkbox" placeholder="Box Size" {...register("dynamic")} />

      <br />
      <input type="submit" />
    </form>
  );
};

export default BoxForm;
