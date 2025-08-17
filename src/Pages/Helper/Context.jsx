import React, { createContext, useState } from "react";

export const UserName = createContext({});
export const LoggedIn = createContext({});
export const GuestSession = createContext({});

// Create a new context
export const Sessions = createContext();

// Create a provider component to wrap the components that will use the context
export const MySessionProvider = ({ children }) => {
  // Define the state that we want to share between components
  const [sessionsLength, setSessoinsLength] = useState(0);

  // Create an object with the values that we want to pass to the consumer components
  const contextValues = {
    sessionsLength: sessionsLength,
    setSessionsLength: setSessoinsLength,
  };

  // Return the provider component with the context values
  return (
    <Sessions.Provider value={contextValues}>{children}</Sessions.Provider>
  );
};
