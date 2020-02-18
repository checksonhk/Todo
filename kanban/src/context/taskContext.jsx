import React, { createContext } from 'react';
import { useReducer } from 'react';

export const taskContext = createContext();

function taskReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TASKS':
      return { ...state, projects: action.payload, isLoading: false };
    case 'GET_TASKS':
      return state;
    case 'UPDATE_TASK':
      return {
        ...state,
        projects: { ...state.projects, [action.id]: { ...state.projects[action.id], project_stage: state.draggedOverCol } },
      };
    case 'ADD_TASK':
      return {
        ...state,
        projects: { ...state.projects, [action.id]: action.payload },
      };
    case 'SET':
      return { ...state, [action.key]: action.payload };
    default:
      return state;
  }
}

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
