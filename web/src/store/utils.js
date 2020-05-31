export const createReducer = (initialState = null, actions = {}) => {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
      return actions[action.type](state, action);
    }

    return state;
  };
};

export const createAction = (actionTypes, method) => {
  const action = params => async (dispatch, getState, {api}) => {
    const {fetch: fetchActionType, loading} = actionTypes;

    if (loading) {
      dispatch({type: loading});
    }

    const response = await method(api)(params);

    if (response.ok) {
      const payload = await response.json();
      dispatch({type: fetchActionType, payload});
      return {payload};
    }
  };

  return action;
};

export const normalizeArray = (array = []) => {
  return array.reduce((result, item) => {
    result[item._id] = item;

    return result;
  }, {});
};
