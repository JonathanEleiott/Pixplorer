// Brings in redux and rest of app

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    /////////////////////////////////////////////////////
    // WAY TO ACCESS STATE FROM ANYWHERE IN THE APP ////
    ///UNCOMMENT WHEN TESTING STATE/////////////////////
    /////////////////////////////////////////////////////
    // store.subscribe(() => {
    //   console.log(store.getState().auth.currentUserId);
    // });

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
