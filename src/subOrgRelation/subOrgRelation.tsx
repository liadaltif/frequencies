// SubOrgRelation.tsx

import React, { useRef } from "react";
import Draggable from "react-draggable";
import "./SubOrgRelation.css";

interface SubOrgRelationProps {
  onButtonClick: (buttonName: string) => void;
  pressedButtons: string[];
}

const SubOrgRelation: React.FC<SubOrgRelationProps> = ({
  onButtonClick,
  pressedButtons,
}) => {
  const draggableRef = useRef(null);

  const handleButtonClick = (buttonName: string) => {
    onButtonClick(buttonName);
  };

  return (
    <Draggable nodeRef={draggableRef} defaultPosition={{ x: -450, y: -240 }}>
      <div ref={draggableRef} className="subOrgRelation-window">
        <div className="subOrgRelation-header">
          <span>SubOrgRelation</span>
        </div>
        <div className="subOrgRelation-content">
          <button
            onClick={() => handleButtonClick("Button 1")}
            className={pressedButtons.includes("Button 1") ? "pressed" : ""}
          >
            Button 1
          </button>
          <button
            onClick={() => handleButtonClick("Button 2")}
            className={pressedButtons.includes("Button 2") ? "pressed" : ""}
          >
            Button 2
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default SubOrgRelation;
