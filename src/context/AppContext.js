import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiSelectItem, setMultiSelectItem] = useState([]);

  return (
    <AppContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        multiSelectItem,
        setMultiSelectItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
