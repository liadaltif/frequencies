// OrgRelation.tsx

import React, { useRef } from "react";
import Draggable from "react-draggable";
import "./OrgRelation.css";

interface OrgRelationProps {
  onButtonClick: (buttonName: string) => void;
  pressedButtons: string[];
}

const OrgRelation: React.FC<OrgRelationProps> = ({
  onButtonClick,
  pressedButtons,
}) => {
  const draggableRef = useRef(null);

  const handleButtonClick = (buttonName: string) => {
    onButtonClick(buttonName);
  };

  return (
    <Draggable nodeRef={draggableRef} defaultPosition={{ x: -50, y: -240 }}>
      <div ref={draggableRef} className="orgRelation-window">
        <div className="orgRelation-header">
          <span>שייכות ארגונית</span>
        </div>
        <div className="orgRelation-content">
          <button
            onClick={() => handleButtonClick("ITU")}
            className={pressedButtons.includes("ITU") ? "pressed" : ""}
          >
            ITU
          </button>
          <button
            onClick={() => handleButtonClick("CPT")}
            className={pressedButtons.includes("CPT") ? "pressed" : ""}
          >
            CPT
          </button>
          <button
            onClick={() => handleButtonClick("אזרחי")}
            className={pressedButtons.includes("אזרחי") ? "pressed" : ""}
          >
            אזרחי
          </button>
          <button
            onClick={() => handleButtonClick('צה"ל')}
            className={pressedButtons.includes('צה"ל') ? "pressed" : ""}
          >
            צה"ל
          </button>
          <button
            onClick={() => handleButtonClick("משטרת ישראל")}
            className={pressedButtons.includes("משטרת ישראל") ? "pressed" : ""}
          >
            משטרת ישראל
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default OrgRelation;
