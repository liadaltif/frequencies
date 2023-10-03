import React from "react";
import Draggable from "react-draggable";
import "./MainSidebar.css";

interface mainSidebarProps {
  initialText?: string;
}

const mainSidebar: React.FC<mainSidebarProps> = ({
  initialText = "שם גנרי למערכת",
}) => {
  const handleTextChange = (_event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle text changes if needed
  };

  return (
    <Draggable>
      <div className="main-sidebar">
        <div
          className="green-top"
          contentEditable={true}
          onInput={handleTextChange}
        >
          {initialText}
        </div>
        <div className="gray-bottom">
          <label>תחום התחלה</label>
          <input type="text" placeholder="תחום התחלה" />
          <label>תחום סוף</label>
          <input type="text" placeholder="תחום סוף" />
        </div>
      </div>
    </Draggable>
  );
};

export default mainSidebar;
