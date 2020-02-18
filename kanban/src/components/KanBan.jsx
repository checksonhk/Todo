import React from 'react';
/*
 * The Kanban React component
 */

export default function Kanban(props) {
  const style = {
    padding: '30px',
    paddingTop: '5px',
  };

  return (
    <div style={style}>
      <h1>Project Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
