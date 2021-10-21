import React from 'react';
import { HistoryProvider } from './History';

const AppProvider: React.FC = ({ children }) => (<HistoryProvider>{children}</HistoryProvider>);

export { AppProvider };
