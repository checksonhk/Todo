import React from 'react';
import { useState } from 'react';
/*
 * The Kanban Board Column React component
 */
export default function KanbanColumn(props) {
  const [mouseIsHovering, setMouseIsHovering] = useState(false);

  function generateKanbanCards() {
    return props.projects.slice(0).map(project => {
      return <KanbanCard project={project} key={project.name} onDragEnd={props.onDragEnd} />;
    });
  }

  const columnStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '5px',
    marginBottom: '5px',
    paddingLeft: '5px',
    paddingTop: '0px',
    width: '230px',
    textAlign: 'center',
    backgroundColor: mouseIsHovering ? '#d3d3d3' : '#f0eeee',
  };
  return (
    <div
      style={columnStyle}
      onDragEnter={e => {
        setMouseIsHovering(true);
        props.onDragEnter(e, props.stage);
      }}
      onDragExit={e => {
        setMouseIsHovering(false);
      }}>
      <h4>
        {props.stage}. {props.name} ({Object.keys(props.projects).length})
      </h4>
      {generateKanbanCards()}
      <br />
    </div>
  );
}
