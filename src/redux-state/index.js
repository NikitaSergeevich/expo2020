import { authorizationReducer } from './auth/reducer';
// import { geoPointsReducer } from './geo/reducer';
// import { newsReducer } from './news/reducer';
// import { productsReducer } from './product/reducer';
// import { profileReducer } from './profile/reducer';
// import { walkReducer } from './walk/reducer';
// import { chatReducer } from './chat/reducer';
// import { usersReducer } from './users/reducer';

export default (rootReducer = (state = {}, action) => {
  return {
    authorizationReducer: authorizationReducer(state.authorizationReducer, action),
    // geoPointsReducer: geoPointsReducer(state.geoPointsReducer, action),
    // newsReducer: newsReducer(state.newsReducer, action),
    // productsReducer: productsReducer(state.productsReducer, action),
    // profileReducer: profileReducer(state.profileReducer, action),
    // walkReducer: walkReducer(state.walkReducer, action),
    // chatReducer: chatReducer(state.chatReducer, action),
    // usersReducer: usersReducer(state.usersReducer, action)
  };
});
