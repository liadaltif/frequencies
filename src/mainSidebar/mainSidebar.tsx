// MainSidebar.tsx

import React, { useState, useRef } from "react";
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
  const [buttonStates, setButtonStates] = useState<
    {
      isPopupOpen: boolean;
      pressedButtons: string[];
    }[]
  >(buttons.map(() => ({ isPopupOpen: false, pressedButtons: [] })));

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    "תחום התחלה": "",
    "תחום סוף": "",
  });

  const [editableContent, setEditableContent] = useState(initialHeaderText);

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

  const handleInputChange = (label: string, value: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [label]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setEditableContent(e.target.textContent || "");
  };

  const draggableRef = useRef(null);

  const handleAdditionalButtonClick = () => {
    const logData = {
      ...inputValues,
      editableContent: editableContent,
      buttons: buttons.map((button, index) => ({
        [button.label]: {
          pressedButtons: buttonStates[index].pressedButtons,
        },
      })),
    };

    console.log("Additional Button Clicked:", logData);
  };

  return (
    <>
      <Draggable defaultPosition={{ x: 500, y: -200 }} nodeRef={draggableRef}>
        <div ref={draggableRef} className="main-sidebar">
          <div
            className={`green-top ${
              buttonStates.some((state) => state.pressedButtons.length > 0)
                ? "pressed"
                : ""
            }`}
            contentEditable={true}
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: editableContent }}
          />
          <div className="gray-bottom">
            {Object.entries(inputValues).map(([label, value], index) => (
              <React.Fragment key={index}>
                <label htmlFor={label.toLowerCase()}>
                  {label}
                  <input
                    type="text"
                    placeholder={label}
                    value={value}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    id={label.toLowerCase()}
                  />
                </label>
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
            <div className="additional-button-container">
              <button onClick={handleAdditionalButtonClick}>
                Additional Button
              </button>
            </div>
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
    buttonName: "בחר",
    isPopupOpen: false,
    pressedButtons: [],
    component: OrgRelation,
    label: "שייכות ארגונית",
  },
  {
    buttonName: "Hello2",
    isPopupOpen: false,
    pressedButtons: [],
    component: SubOrgRelation,
    label: "hello 2",
  },
];

export default () => <MainSidebar buttons={buttons} />;
