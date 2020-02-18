import React, { useContext } from 'react';
import { useEffect } from 'react';
import taskContext from '../context/taskContext';
import KanbanList from './KanBanList';

let projectList = {
  1: {
    id: 1,
    name: 'Project 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 1,
  },
  2: {
    id: 2,
    name: 'Project 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 1,
  },
  3: {
    id: 3,
    name: 'Project 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 1,
  },
  4: {
    id: 4,
    name: 'Project 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 2,
  },
  5: {
    id: 5,
    name: 'Project 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 3,
  },
  6: {
    id: 6,
    name: 'Project 6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 3,
  },
  7: {
    id: 7,
    name: 'Project 7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    project_stage: 4,
  },
};
/*
 * The Kanban Board React component
 */
export default function KanbanBoard(props) {
  const { state, dispatch, handleOnDragEnd, handleOnDragEnter } = useContext(taskContext);
  const columns = [
    { id: 1, name: 'Planning', stage: 1 },
    { id: 1, name: 'Design', stage: 2 },
    { id: 1, name: 'In Progress', stage: 3 },
    { id: 1, name: 'Testing', stage: 4 },
    { id: 1, name: 'Launch', stage: 5 },
  ];

  useEffect(() => {
    dispatch({ type: 'INIT', payload: projectList });
  });

  return state.isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      {columns.map(column => {
        return (
          <KanbanList
            name={column.name}
            stage={column.stage}
            projects={state.projects.filter(project => {
              return parseInt(project.project_stage, 10) === column.stage;
            })}
            onDragEnter={handleOnDragEnter}
            onDragEnd={handleOnDragEnd}
            key={column.stage}
          />
        );
      })}
    </div>
  );
}
