import React from 'react';
import { AppProvider } from './Day3Context';
import { TaskManager } from './Day3Hooks';

function Day3App() {
  return (
    <AppProvider>
      <TaskManager />
    </AppProvider>
  );
}

export default Day3App;
