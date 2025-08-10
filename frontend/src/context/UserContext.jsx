import React, { createContext, useState } from "react";
export const userDataContext = createContext();
function UserContext({ children }) {
  const [user, setuser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      <userDataContext.Provider value={user}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
