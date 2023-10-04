import React from "react";
import Draggable from "react-draggable";
import "./OrgRelation.css";

interface OrgRelationProps {
  onClose: () => void;
  onButtonClick: (buttonName: string) => void;
  pressedButtons: string[];
}

const OrgRelation: React.FC<OrgRelationProps> = ({
  onClose,
  onButtonClick,
  pressedButtons,
}) => {
  const handleButtonClick = (buttonName: string) => {
    onButtonClick(buttonName);
  };

  return (
    <Draggable defaultPosition={{ x: 0, y: 0 }}>
      <div className="orgRelation-window">
        <div className="orgRelation-header">
          <span>Popup Window</span>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="orgRelation-content">
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

export default OrgRelation;
