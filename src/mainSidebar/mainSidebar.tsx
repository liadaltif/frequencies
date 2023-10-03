import React, { useState } from "react";
import Draggable from "react-draggable";
import "./MainSidebar.css";
import OrgRelation from "../orgRelation/orgRelation";

interface mainSidebarProps {
  initialText?: string;
}

const MainSidebar: React.FC<mainSidebarProps> = ({
  initialText = "שם גנרי למערכת",
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleTextChange = (_event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle text changes if needed
  };

  return (
    <>
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
            <button className="green-button" onClick={togglePopup}>
              Open Popup
            </button>
          </div>
        </div>
      </Draggable>
      {isPopupOpen && <OrgRelation />}
    </>
  );
};

export default MainSidebar;
