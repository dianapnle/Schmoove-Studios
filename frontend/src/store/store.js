import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import  thunk  from 'redux-thunk';
import sessionReducer from "./session"
import studiosReducer from './studios';
import instructorsReducer from './instructors';
import usersReducer from './users';
import classesReducer from './classes';
import dancestylesReducer from './dancestyles';



const rootReducer = combineReducers({
    session: sessionReducer,
    studios: studiosReducer,
    instructors: instructorsReducer,
    users: usersReducer,
    classes: classesReducer,
    dancestyles: dancestylesReducer
});



  let enhancer;
  if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
