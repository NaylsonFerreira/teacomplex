import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

import {
  HomeScreen,
  DrawerScreen,
  MenuDrawer,
  LoadingScreen,
  SignUpScreen,
  SignInScreen,
} from './src/screens';

const Drawer = createDrawerNavigator();

export default function App() {
  const onMessageReceived = (remoteMessage) => {
    console.log(remoteMessage.notification);
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  };

  useEffect(() => {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="SignInScreen"
        drawerContent={MenuDrawer}>
        <Drawer.Screen name="MenuDrawer" component={MenuDrawer} />
        <Drawer.Screen name="LoadingScreen" component={LoadingScreen} />
        <Drawer.Screen name="SignInScreen" component={SignInScreen} />
        <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="DrawerScreen" component={DrawerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
