import React from 'react';
import './App.css';
import TaskContextProvider from './context/taskContext';
import Kanban from './components/KanBan';

function App() {
  return (
    <div className='App'>
      {/* <header className='App-header'></header> */}
      <TaskContextProvider>
        <Kanban />
      </TaskContextProvider>
    </div>
  );
}

export default App;
