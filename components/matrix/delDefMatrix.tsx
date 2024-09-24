"use client";
import { deleteDefMatrix } from "@/lib/_matrix";
import React from "react";
import { MdDelete } from "react-icons/md";

type DelDefMatrixProps = {
  id: string;
  refresh?: any;
  setRefresh?: (el: any) => void;
};
const DelDefMatrix = ({ id, refresh, setRefresh }: DelDefMatrixProps) => {
  return (
    <div>
      <MdDelete
        onClick={async () => {
          await deleteDefMatrix(id);
          // setRefresh(!refresh);
        }}
        size={20}
        className="text-red-600"
      />
    </div>
  );
};

export default DelDefMatrix;
