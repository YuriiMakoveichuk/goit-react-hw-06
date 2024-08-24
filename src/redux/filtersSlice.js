const INITIAL_STATE = {
  name: "",
};

export const filtersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "filters/setFilterValue": {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
};

export const setFilterValue = (payload) => {
  return {
    type: "filters/setFilterValue",
    payload: payload,
  };
};
