function layoutReducer(state, action) {
  switch (action.type) {
    case 'set-loading': {
      return {
        ...state,
        loading: action.loading,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default layoutReducer;