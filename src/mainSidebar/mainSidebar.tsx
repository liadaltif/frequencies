import React, { useState } from "react";
import Draggable from "react-draggable";
import "./MainSidebar.css";
import OrgRelation from "../orgRelation/orgRelation";
import SubOrgRelation from "../subOrgRelation/subOrgRelation";

interface BasePopupProps {
  onButtonClick: (buttonName: string) => void;
  pressedButtons: string[];
}

interface ButtonInfo {
  buttonName: string;
  initialButtonText: string;
  isPopupOpen: boolean;
  pressedButtons: string[];
  component: React.ComponentType<BasePopupProps>;
  label: string;
}

interface MainSidebarProps {
  initialHeaderText?: string;
  buttons: ButtonInfo[];
}

const MainSidebar = ({
  initialHeaderText = "שם גנרי למערכת",
  buttons,
}: MainSidebarProps) => {
  const [buttonStates, setButtonStates] = useState<{
    isPopupOpen: boolean;
    pressedButtons: string[];
  }[]>(buttons.map(() => ({ isPopupOpen: false, pressedButtons: [] })));

  const togglePopup = (index: number) => {
    setButtonStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isPopupOpen: !state.isPopupOpen } : state
      )
    );
  };

  const handleButtonClick = (index: number, buttonName: string) => {
    setButtonStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index
          ? {
              ...state,
              pressedButtons: toggleButtonState(
                state.pressedButtons,
                buttonName
              ),
            }
          : state
      )
    );
  };

  const toggleButtonState = (buttons: string[], buttonName: string) =>
    buttons.includes(buttonName)
      ? buttons.filter((btn) => btn !== buttonName)
      : [...buttons, buttonName];

  return (
    <>
      <Draggable defaultPosition={{ x: 500, y: -200 }}>
        <div className="main-sidebar">
          <div
            className={`green-top ${
              buttonStates.some(
                (state) => state.pressedButtons.length > 0
              )
                ? "pressed"
                : ""
            }`}
            contentEditable={true}
          >
            {initialHeaderText}
          </div>
          <div className="gray-bottom">
            {buttons.map((_button, index) => (
              <React.Fragment key={index}>
                <label>{index === 0 ? "תחום התחלה" : "תחום סוף"}</label>
                <input
                  type="text"
                  placeholder={
                    index === 0 ? "תחום התחלה" : "תחום סוף"
                  }
                />
              </React.Fragment>
            ))}
            {buttons.map((button, index) => (
              <React.Fragment key={index}>
                <label>{button.label}</label>
                <button
                  className={`green-button ${
                    buttonStates[index].pressedButtons.length > 0
                      ? "pressed"
                      : ""
                  }`}
                  onClick={() => togglePopup(index)}
                >
                  {buttonStates[index].pressedButtons.length > 0
                    ? buttonStates[index].pressedButtons.join(",")
                    : button.buttonName}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Draggable>
      {buttons.map((button, index) => (
        <React.Fragment key={index}>
          {buttonStates[index].isPopupOpen && (
            <button.component
              onButtonClick={(buttonName: string) =>
                handleButtonClick(index, buttonName)
              }
              pressedButtons={buttonStates[index].pressedButtons}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const buttons: ButtonInfo[] = [
  {
    buttonName: "Hello1",
    initialButtonText: "Button 1",
    isPopupOpen: false,
    pressedButtons: [],
    component: OrgRelation,
    label: "hello 1",
  },
  {
    buttonName: "Hello2",
    initialButtonText: "Button 2",
    isPopupOpen: false,
    pressedButtons: [],
    component: SubOrgRelation,
    label: "hello 2",
  },
  
];

export default () => <MainSidebar buttons={buttons} />;
