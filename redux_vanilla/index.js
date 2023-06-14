const redux = require("redux");
const produce = require("immer").produce;

const createStore = redux.legacy_createStore; //Permite crear el store
const bindActionCreators = redux.bindActionCreators; // Permite agrupar los action que maneja el estado
const combineReducers = redux.combineReducers; // Permite combinar los reducers
const applyMiddleware = redux.applyMiddleware; // Permite añadir middleawares

const reduxLogger = require("redux-logger"); // Middleware de redux
const logger = reduxLogger.createLogger(); // Instanciamos el middleware

// TYPES
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "INCECREAM_RESTOCKED";

// ACTIONS
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: {
      quatity: 1,
    },
  };
}
function restockCake() {
  return {
    type: CAKE_RESTOCKED,
    payload: {
      quatity: 1,
    },
  };
}
function orderIcecream() {
  return {
    type: ICECREAM_ORDERED,
    payload: {
      quatity: 1,
    },
  };
}
function restockIcecream() {
  return {
    type: ICECREAM_RESTOCKED,
    payload: {
      quatity: 1,
    },
  };
}

// APP INITIAL STATES
const initialCakeState = {
  numsOfCake: 10,
};
const initialIcecreamState = {
  numsOfIcecream: 10,
};

// REDUCERS
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numsOfCake: state.numsOfCake - action.payload.quatity,
      };
    case CAKE_RESTOCKED:
      /*  
    El produce de immer nos ayuda a manejar de forma facil estados que estan anidados.
    Recibe una copia del estado como parametro oficial y un callback con una copia del estado
    como parametro el cual podemos modificar directamente
    */
      return produce(state, (draft) => {
        draft.numsOfCake = draft.numsOfCake - action.payload.quatity;
      });

    default:
      return state;
  }
};
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numsOfIcecream: state.numsOfIcecream - action.payload.quatity,
      };
    case ICECREAM_RESTOCKED:
      /*  
    El produce de immer nos ayuda a manejar de forma facil estados que estan anidados.
    Recibe una copia del estado como parametro oficial y un callback con una copia del estado
    como parametro el cual podemos modificar directamente
    */
      return produce(state, (draft) => {
        draft.numsOfIcecream = draft.numsOfIcecream - action.payload.quatity;
      });

    default:
      return state;
  }
};

// STORE-REDUX CONFIGURATIONS

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: icecreamReducer,
}); // Agrupamos los reducers
const store = createStore(rootReducer, applyMiddleware(logger)); // pasamos los reducers al store al igual que el middleware
const unsubscribe = store.subscribe(() => {}); // nos suscribimos al store
const action = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
); // Agrupamos nuestras acciones

// REDUX IN ACTION!

store.getState(); //Obtener el estado actual
action.orderCake();
action.orderCake();
action.orderCake(); // Hacemos el dispatch de las acciones
action.restockCake();
action.restockCake();
action.orderIcecream();
unsubscribe(); // ejecutamos la funcion capturada de store.subscribe para hacer el unsubscribe
