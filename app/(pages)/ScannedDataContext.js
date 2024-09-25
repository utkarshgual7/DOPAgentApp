// ScannedDataContext.js
import React, { createContext, useContext, useState } from 'react';

const ScannedDataContext = createContext();

export const ScannedDataProvider = ({ children }) => {
  const [scannedData, setScannedData] = useState(null);

  return (
    <ScannedDataContext.Provider value={{ scannedData, setScannedData }}>
      {children}
    </ScannedDataContext.Provider>
  );
};

export const useScannedData = () => useContext(ScannedDataContext);
