/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {AppNavigator} from './app/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './app/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
