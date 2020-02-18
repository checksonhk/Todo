import React, { useState, useContext } from 'react';
import { taskContext } from '../context/taskContext';
import { useReducer } from 'react';
/*
 * The Kanban Board Card component
 */

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, [action.field]: action.payload };
    case 'SUBMIT_FORM':
      return { initialState };
    default:
      return state;
  }
}

const initialState = { id: 11, name: '', description: '', project_stage: 1 };

export default function KanbanCard(props) {
  console.log('RENDERING KANBAN CARD');
  const [collapsed, setCollapsed] = useState(true);
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
      payload: { ...formState, project_stage: props.stage },
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
        <div onClick={e => setCollapsed(state => !state)}>add Task</div>
      ) : (
        <div style={cardStyle}>
          <span>New Task</span>
          <form onSubmit={e => handleSubmit(e)}>
            <input type='text' placeholder='Title' onChange={e => handleChange(e, 'name')}></input>
            <textarea type='text' placeholder='description' onChange={e => handleChange(e, 'description')}></textarea>
            <button type='submit'></button>
          </form>
        </div>
      )}
    </div>
  );
}
