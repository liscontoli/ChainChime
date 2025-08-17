import React from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//const tree = ({}) => {}
const createDataTree = dataset => {
  const hashTable = Object.create(null);
  dataset.forEach(aData => hashTable[aData.id] = {...aData, children: []});
  const dataTree = [];
  dataset.forEach(aData => {
    if(aData.parentId) hashTable[aData.parentId].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  });
  return dataTree;
};
const Tree = ({
  data,
  handleAddField,
  handleDeleteField,
  handleChange
}) => {
  // console.log("this is the data",data)
  const renderData = createDataTree(data)
  const renderTree = (nodes, depth = 0) => {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => (
      <div key={node.id}> 
        <div className={`depth-${depth}`} style={{margin:'5px 0'}}>
          <div className="text-field">
          <span className='iconButton' style={{backgroundImage:`url(${require('../assets/ICONS/Vector-5.png')})`, backgroundSize:'14px'}} ></span>
            <textarea
              type="text"
              style={{resize: 'none'}}
              className={`texts`}
              value={node.label}
              placeholder={`Tasks: Name`}
              onChange={(e) => handleChange(node.id, e)}
            />
            <div style={{gap:'15px',flexDirection:'column' , display:'inline-flex'}}>
                <span style={{backgroundImage:`url(${require('../assets/ICONS/Vector-4.png')})`}} className="deleteContainer iconButton" onClick={() => handleDeleteField(node.id,node)}>
                {/* <button onClick={() => handleDeleteField(node.id,node)}>
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{ color: "#ffffff" }}
                    size={"lg"}
                  />
                </button> */}
              </span>
            
              <span style={{backgroundImage:`url(${require('../assets/ICONS/Group 25.png')})`}} className="addContainer iconButton"  onClick={() => handleAddField(node.id)}>
                {/* <button>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#ffffff" }}
                    size={"lg"}
                  />
                </button> */}
              </span>

            </div>
           
          </div>
        
         
        </div>
        {/* {node.children && node.children.length > 0 && ( */}
        <div className="childrenContainer" style={{ marginLeft: "10px" }}>
          {renderTree(node.children, depth + 1)}
        </div>
        {/* )} */}
      </div>
    ));
  };

  return <div style={{height:'100%', width:'100%'}} className="treeContainer">{renderTree(renderData)}</div>;
};

export { Tree };
