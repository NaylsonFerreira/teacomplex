import React, {useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {AuthContext} from './src/hooks/authContext';

import {
  HomeScreen,
  MenuDrawer,
  SignUpScreen,
  SignInScreen,
  LoadingScreen,
  ResetPasswordScreen,
  ProfileScreen,
  HabilidadeScreen,
} from './src/screens';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

  const {token, signOut, loading} = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!token) {
    enableScreens();
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => MenuDrawer({...props, signOut})}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="HabilidadeScreen" component={HabilidadeScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
