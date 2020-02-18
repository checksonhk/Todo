import React, { useState } from 'react';
/*
 * The Kanban Board Card component
 */
export default function KanbanCard(props) {
  const [collapsed, setCollapsed] = useState(true);

  const cardStyle = {
    backgroundColor: '#f9f7f7',
    paddingLeft: '0px',
    paddingTop: '5px',
    paddingBottom: '5px',
    marginLeft: '0px',
    marginRight: '5px',
    marginBottom: '5px',
  };

  return (
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
  );
}
