import { createContext, useState } from "react";

/**
 * Fast Refresh in React works best when a file only exports components.
 * If you define React contexts in the same file as your components,
 * Fast Refresh may not work correctly. 
 * To fix this, move your context definition (e.g., createContext) to a separate file.
 * This file should only contain the provider component and imports the context from another file.
 */

export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
}

export default CaptainContext;
