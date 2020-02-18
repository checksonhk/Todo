import React, { createContext, useState, useEffect } from 'react';
import { useReducer } from 'react';

export const taskContext = createContext();

function taskReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, projects: action.payload, isLoading: false };
    case 'GET_TASKS':
      return state;
    case 'UPDATE_TASK':
      return { state, projects: { ...state.projects, [action.id]: { ...state[action.id], project_stage: action.payload } } };
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

function TaskContextProvider(props) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //this is called when a Kanban card is dragged over a column (called by column)
  function handleOnDragEnter(e, stageValue) {
    dispatch({ type: 'SET', key: draggedOverCol, payload: stageValue });
  }

  //this is called when a Kanban card dropped over a column (called by card)
  function handleOnDragEnd(e, project) {
    // const updatedProjects = this.state.projects.slice(0);
    // updatedProjects.find(projectObject => {
    //   return projectObject.name === project.name;
    // }).project_stage = this.state.draggedOverCol;
    // this.setState({ projects: updatedProjects });
    dispatch({ type: 'UPDATE_TASK', id, payload });
  }

  return (
    <taskContext.Provider
      value={{
        state,
        dispatch,
        handleOnDragEnd,
        handleOnDragEnter,
      }}>
      {props.children}
    </taskContext.Provider>
  );
}

export default TaskContextProvider;
