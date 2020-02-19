export default function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, [action.field]: action.payload };
    case 'SUBMIT_FORM':
      return { id: 0, name: '', description: '', project_stage: 0 };
    default:
      return state;
  }
}
