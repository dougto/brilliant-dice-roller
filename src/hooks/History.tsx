import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IHistoryItem {
  name: string;
  expression: string;
  result: string;
  date: string;
}

export interface IAddHistoryItemInput {
  name: string;
  expression: string;
  result: string;
}

interface IHistoryContext {
  history: IHistoryItem[];
  addHistoryItem(item: IAddHistoryItemInput): void;
  clearHistory(): void;
}

const HistoryContext = createContext<IHistoryContext>({} as IHistoryContext);

const HistoryProvider: React.FC = ({ children }) => {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const storageResult = await AsyncStorage.getItem('@bdr:history');

      const newHistory = storageResult ? JSON.parse(storageResult) : [];

      setHistory(newHistory as IHistoryItem[])
    }

    loadHistory();
  }, []);

  const addHistoryItem = useCallback((addHistoryItemInput: IAddHistoryItemInput) => {
    const date = (new Date()).toLocaleString();

    const newHistoryItem = { date, ...addHistoryItemInput };

    const newHistory = [newHistoryItem, ...history];

    if (newHistory.length > 100) {
      newHistory.pop();
    }

    AsyncStorage.setItem('@bdr:history', JSON.stringify(newHistory));

    setHistory(newHistory);
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);

    AsyncStorage.setItem('@bdr:history', JSON.stringify([]));
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistoryItem,
        clearHistory
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error('useHistory must be used within history provider');
  }

  return context;
}

export { HistoryProvider, useHistory };
