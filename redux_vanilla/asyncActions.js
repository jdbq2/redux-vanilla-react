const axios = require("axios");
const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;

const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

// INITIAL STATE
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// TYPES
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// ACTIONS
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};
const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

// SERVICE OR ASYNC ACTIONS
const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = data.map((user) => user.name);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailed(error.message));
    }
  };
};

// REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//STORE
const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => {
  console.log("State: ", store.getState());
});
store.dispatch(fetchUsers());
