import React, { createContext, useState } from "react";
export const userDataContext = createContext();

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
