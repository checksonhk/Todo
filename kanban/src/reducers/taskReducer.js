export default function taskReducer(state, action) {
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
