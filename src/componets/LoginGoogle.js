import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '441914668342-5hntj8t5h87vajge9hve284j545e5gfk.apps.googleusercontent.com', // https://console.cloud.google.com/apis/credentials/oauthclient/
  forceCodeForRefreshToken: true,
  offlineAccess: true,
});

const LoginGoogle = async (props) => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    props.custom_console(JSON.stringify(error));
  }
};

export default LoginGoogle;
