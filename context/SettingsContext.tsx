import React, { createContext, useContext, useState } from "react";

interface SettingsContextType {
  showRemaining: boolean;
  setShowRemaining: (value: boolean) => void;
  deckCount: number;
  setDeckCount: (value: number) => void;
  showRemainingGame: boolean;
  setShowRemainingGame: (value: boolean) => void;
  deckCountGame: number;
  setDeckCountGame: (value: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showRemaining, setShowRemaining] = useState<boolean>(true);
  const [deckCount, setDeckCount] = useState<number>(1);
  const [showRemainingGame, setShowRemainingGame] = useState<boolean>(true);
  const [deckCountGame, setDeckCountGame] = useState<number>(1);

  return (
    <SettingsContext.Provider
      value={{
        showRemaining,
        setShowRemaining,
        deckCount,
        setDeckCount,
        showRemainingGame,
        setShowRemainingGame,
        deckCountGame,
        setDeckCountGame,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
