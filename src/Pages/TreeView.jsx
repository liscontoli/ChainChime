import React from "react";
import { Tree } from "./Tree";

const TreeView = ({ data, handleAddField, handleDeleteField, handleChange}) => {
  return (
    <div className="task-container ">
      <Tree
        data={data}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
        handleChange={handleChange}
      />
    </div>
  );
};

export { TreeView };
