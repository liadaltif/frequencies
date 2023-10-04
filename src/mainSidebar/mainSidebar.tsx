// MainSidebar.tsx

import React, { useState } from "react";
import Draggable from "react-draggable";
import "./MainSidebar.css";
import OrgRelation from "../orgRelation/orgRelation";

interface MainSidebarProps {
  initialHeaderText?: string;
  initialButtonText?: string;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  initialHeaderText = "שם גנרי למערכת",
  initialButtonText = "hello",
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pressedButtons, setPressedButtons] = useState<string[]>([]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (buttonName: string) => {
    const newPressedButtons = pressedButtons.includes(buttonName)
      ? pressedButtons.filter((btn) => btn !== buttonName)
      : [...pressedButtons, buttonName];
    setPressedButtons(newPressedButtons);
  };

  const getButtonText = () => {
    return pressedButtons.length > 0
      ? pressedButtons.join(",")
      : initialButtonText;
  };

  return (
    <>
      <Draggable defaultPosition={{ x: 0, y: 0 }}>
        <div className="main-sidebar">
          <div
            className={`green-top ${
              pressedButtons.length > 0 ? "pressed" : ""
            }`}
            contentEditable={true}
          >
            {initialHeaderText}
          </div>
          <div className="gray-bottom">
            <label>תחום התחלה</label>
            <input type="text" placeholder="תחום התחלה" />
            <label>תחום סוף</label>
            <input type="text" placeholder="תחום סוף" />
            <button
              className={`green-button ${
                pressedButtons.length > 0 ? "pressed" : ""
              }`}
              onClick={togglePopup}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </Draggable>
      {isPopupOpen && (
        <OrgRelation
          onClose={handleClosePopup}
          onButtonClick={handleButtonClick}
          pressedButtons={pressedButtons}
        />
      )}
    </>
  );
};

export default MainSidebar;
