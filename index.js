import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/hooks/authContext';
import {NavigationContainer} from '@react-navigation/native';

const ReduxApp = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
