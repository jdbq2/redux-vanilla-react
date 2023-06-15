const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

/**
 El asyncThunk genera automaticamente estados de fullfilled, pendig y rejected
 */
const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users = data.map((user) => user.name);
  return users;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  /*
  Usando la propiedad extra reducers del slice controlamos los estados generados por el 
  thunk y los adaptamos al estado del slice
  */
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

module.exports = userSlice.reducer;
module.exports.userActions = userSlice.actions;
module.exports.fetchUsers = fetchUsers;
