import React, { useState, useContext, useReducer } from 'react';
import { taskContext } from '../context/taskContext';
import formReducer from '../reducers/formReducer';
/*
 * The Kanban Board Card component
 */

const initialState = { id: 0, name: '', description: '', project_stage: 0 };

export default function KanbanCard(props) {
  const [collapsed, setCollapsed] = useState(true); //true
  const { taskState, taskDispatch } = useContext(taskContext);
  const cardStyle = {
    backgroundColor: '#f9f7f7',
    paddingLeft: '0px',
    paddingTop: '5px',
    paddingBottom: '5px',
    marginLeft: '0px',
    marginRight: '5px',
    marginBottom: '5px',
  };
  const [formState, formDispatch] = useReducer(formReducer, initialState);

  function serializeID(taskState) {
    return Object.keys(taskState.projects).length + 1;
  }

  function handleSubmit(e) {
    e.preventDefault();
    taskDispatch({
      type: 'ADD_TASK',
      id: serializeID(taskState),
      payload: { ...formState, id: serializeID(taskState), project_stage: props.stage },
    });
    formDispatch({ type: 'SUBMIT_FORM' });
    setCollapsed(state => !state);
  }

  function handleChange(e, field) {
    formDispatch({
      type: 'SET_FORM',
      field: field,
      payload: e.currentTarget.value,
    });
  }

  const addCardStyle = {
    textAlign: 'left',
    paddingLeft: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    marginLeft: '0px',
    marginRight: '5px',
    marginBottom: '5px',
    cursor: 'pointer',
  };

  const cardFormStyle = {
    backgroundColor: '#f9f7f7',
    paddingBottom: '5px',
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const cardFormButton = {};

  return props.project ? (
    <div
      style={cardStyle}
      draggable={true}
      onDragEnd={e => {
        props.onDragEnd(e, props.project.id);
      }}>
      <div>
        <h4>{props.project.name}</h4>
      </div>
      {!collapsed && (
        <div>
          <strong>Description: </strong>
          {props.project.description}
          <br />
        </div>
      )}
      <div
        style={{ width: '100%' }}
        onClick={e => {
          setCollapsed(state => !state);
        }}>
        {collapsed ? String.fromCharCode('9660') : String.fromCharCode('9650')}
      </div>
    </div>
  ) : (
    <div>
      {collapsed ? (
        <div style={addCardStyle} onClick={e => setCollapsed(state => !state)}>
          add Task
        </div>
      ) : (
        <div style={cardFormStyle}>
          <form onSubmit={e => handleSubmit(e)}>
            <input type='text' placeholder='Title' onChange={e => handleChange(e, 'name')}></input>
            <textarea type='text' placeholder='description' onChange={e => handleChange(e, 'description')}></textarea>
            <br />
            <button style={cardFormButton} type='submit'>
              New Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
