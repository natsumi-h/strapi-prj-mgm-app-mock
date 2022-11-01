import { useState } from "react";

export const useModalStateSwitcher = () => {
  const [modalClass, setModalClass] = useState("hidden");
  const [modalText, setModalText] = useState("");
  const [buttonType, setButtonType] = useState("");

  return {
    modalClass,
    setModalClass,
    modalText,
    setModalText,
    buttonType,
    setButtonType,
  };
};
