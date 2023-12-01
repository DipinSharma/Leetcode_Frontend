import React, { createContext, useContext, useState } from "react";

const QuestionContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [details, setDetails] = useState("");

  const setGlobalDetails = (data) => {
    setDetails(data);
  };

  return (
    <QuestionContext.Provider value={{ details, setGlobalDetails }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useDetails = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useDetails must be used within a DetailsProvider");
  }
  return context;
};
