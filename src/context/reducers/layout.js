import { layoutTypes } from '../types';

function layoutReducer(state, action) {
  switch (action.type) {
    case layoutTypes.SET_LOADING: {
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