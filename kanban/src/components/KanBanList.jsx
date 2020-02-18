/*
 * The Kanban Board Column React component
 */
class KanbanColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseIsHovering: false };
  }

  componentWillReceiveProps(nextProps) {
    this.state = { mouseIsHovering: false };
  }

  generateKanbanCards() {
    return this.props.projects.slice(0).map(project => {
      return <KanbanCard project={project} key={project.name} onDragEnd={this.props.onDragEnd} />;
    });
  }

  render() {
    const columnStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      marginRight: '5px',
      marginBottom: '5px',
      paddingLeft: '5px',
      paddingTop: '0px',
      width: '230px',
      textAlign: 'center',
      backgroundColor: this.state.mouseIsHovering ? '#d3d3d3' : '#f0eeee',
    };
    return (
      <div
        style={columnStyle}
        onDragEnter={e => {
          this.setState({ mouseIsHovering: true });
          this.props.onDragEnter(e, this.props.stage);
        }}
        onDragExit={e => {
          this.setState({ mouseIsHovering: false });
        }}>
        <h4>
          {this.props.stage}. {this.props.name} ({this.props.projects.length})
        </h4>
        {this.generateKanbanCards()}
        <br />
      </div>
    );
  }
}
