import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  index: number;
  setIndex: (index: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ isCollapsed, setIsCollapsed, index, setIndex }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};