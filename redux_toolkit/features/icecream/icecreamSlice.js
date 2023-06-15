const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfIcecream: 15,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState: initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfIcecream = state.numOfIcecream - action.payload;
    },
    restocked: (state, action) => {
      state.numOfIcecream = state.numOfIcecream + action.payload;
    },
  },
  /*
  Los extra reducers sirven para hacer operaciones en el slice 
  derivadas de disparar una accion en otro slice.
  
  extraReducers: {
    ["cake/ordered"]: (state, action) => {
      state.numOfIcecream -= action.payload;
    },
  },
  */
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state, action) => {
      state.numOfIcecream -= action.payload;
    });
  },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
