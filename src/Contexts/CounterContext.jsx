import { createContext, useState } from "react";

export const CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  const [counter, setcounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter, setcounter }}>
      {children}
    </CounterContext.Provider>
  );
} 
