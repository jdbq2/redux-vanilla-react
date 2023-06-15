const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const icecreamActions =
  require("./features/icecream/icecreamSlice").icecreamActions;
const fetchUsers = require("./features/user/userSlice").fetchUsers;

const unsubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());
/*
store.dispatch(cakeActions.ordered(1));
store.dispatch(cakeActions.ordered(2));
store.dispatch(cakeActions.ordered(1));
store.dispatch(cakeActions.restocked(6));
store.dispatch(icecreamActions.ordered(5));
store.dispatch(icecreamActions.restocked(15));
*/
