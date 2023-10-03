import React from "react";
import Draggable from "react-draggable";
import "./OrgRelation.css";

interface OrgRelationProps {}

const OrgRelation: React.FC<OrgRelationProps> = () => {
  return (
    <Draggable>
      <div className="orgRelation-window">
        <div className="orgRelation-header">
          <span>Popup Window</span>
        </div>
        <div className="orgRelation-content">
          {/* Add content for the popup here */}
        </div>
      </div>
    </Draggable>
  );
};

export default OrgRelation;
