import React, { createContext, useReducer } from 'react';
import taskReducer from '../reducers/taskReducer';
export const taskContext = createContext();

const initialState = {
  isLoading: true,
  projects: {},
  draggedOverCol: 0,
};

export default function TaskContextProvider(props) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //this is called when a Kanban card is dragged over a column (called by column)
  function handleOnDragEnter(e, stageValue) {
    dispatch({ type: 'SET', key: 'draggedOverCol', payload: stageValue });
  }

  //this is called when a Kanban card dropped over a column (called by card)
  function handleOnDragEnd(e, id) {
    dispatch({ type: 'UPDATE_TASK', id });
  }

  return (
    <taskContext.Provider
      value={{
        taskState: state,
        taskDispatch: dispatch,
        handleOnDragEnd,
        handleOnDragEnter,
      }}>
      {props.children}
    </taskContext.Provider>
  );
}
