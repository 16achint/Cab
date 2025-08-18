import React, { createContext, useState } from "react";
export const userDataContext = createContext();

/**
 * Fast Refresh in React works best when a file only exports components.
 * If you define React contexts in the same file as your components,
 * Fast Refresh may not work correctly. 
 * To fix this, move your context definition (e.g., createContext) to a separate file.
 * This file should only contain the provider component and imports the context from another file.
 */

function UserContext({ children }) {
  const [user, setuser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  return (
    <div>
      <userDataContext.Provider value={{ user, setuser }}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
