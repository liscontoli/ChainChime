import React, { useEffect, useState } from "react";
import "./Style.css";
import { decryptTasks } from "../utils/taskEncryption";

// Fetch the tasks associated with logged in user from database
// Define a function that fetches tasks from the database and updates the state
const createDataTree = dataset => {
  const hashTable = Object.create(null);
  dataset.forEach(aData => hashTable[aData.id] = { ...aData, children: [] });
  const dataTree = [];
  dataset.forEach(aData => {
    if (aData.parentId) hashTable[aData.parentId].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  });
  return dataTree;
};

function getBottomUp(node) {
  if (node.children.length === 0) {
    return node;
  }

  const children = node.children.map((v) => getBottomUp(v));
  const uncheckedChilds = children.filter((n) => !n.checked).length > 0;
  return {
    ...node,
    checked: !uncheckedChilds,
    children,
  };
}

function LabelTree({ fields, setFields }) {
  const [dataTree, setDataTree] = useState([]);

  useEffect(() => {
    const decryptedTasks = decryptTasks(fields);
    let newRenderData = createDataTree(decryptedTasks);
    newRenderData = newRenderData.map((n) => getBottomUp(n));
    setDataTree(newRenderData);
  }, [fields, setFields]);

  const handleCheckboxChange = (fieldId, node, checked) => {
    let descendants = [fieldId];
    let ancestors = [];

    // Recursively add all descendants
    function recurseAndAddDescendants(node) {
      descendants.push(node.id);
      var children = node.children;
      for (let i = 0; i < children.length; i++) {
        recurseAndAddDescendants(children[i]);
      }
    }

    // Recursively add all ancestors
    function recurseAndAddAncestors(fields, currentId) {
      fields.forEach((field) => {
        if (field.id === currentId && field.parentId !== null) {
          ancestors.push(field.parentId);
          recurseAndAddAncestors(fields, field.parentId);
        }
      });
    }

    recurseAndAddDescendants(node);
    recurseAndAddAncestors(fields, fieldId);

    const newFields = fields.map((field) => {
      if (descendants.includes(field.id)) {
        return { ...field, checked };
      } else if (ancestors.includes(field.id)) {
        const childChecked = fields.some(
          (f) => f.parentId === field.id && f.checked
        );
        return { ...field, checked: childChecked || checked };
      } else {
        return field;
      }
    });
    return newFields;
  };

  const renderTree = (fields, depth = 0) => {
    if (!fields) {
      return null;
    }
    return fields.map((node) => (
      <div key={node.id}>
        <div className={`depth-${depth}`} style={{alignContent:'start', padding:"5px"}}>
        <div className="text-field2">
          <div style={{color:'#95ADEE',alignContent:"center"}} >
            <label
              type="text"
              className={`text ${node.checked ? "checked" : ""}`}
            >
            + {node.label}{"\u00A0".repeat(30)} 

            </label>
          </div>
          <div className="checkboxContainer">
            <input
              type="checkbox"
              className="checkbox"
              checked={node.checked} // update this
              onChange={(e) => {
                const updatedTree = handleCheckboxChange(
                  node.id,
                  node,
                  e.target.checked
                );
                setFields(updatedTree);
              }}
            />
          </div>
        </div>
        </div>
        {/* {node.children && node.children.length > 0 && ( */}
        <div className="childrenContainer" style={{ marginLeft: "20px" }}>
          {renderTree(node.children, depth + 1)}
        </div>
        {/* )} */}
      </div>
    ));
  };
  return (
    <>
      <div className="treeContainer">{renderTree(dataTree)}</div>
    </>
  );
}

export default LabelTree;
