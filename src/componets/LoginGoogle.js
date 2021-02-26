import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

// https://console.cloud.google.com/apis/credentials/oauthclient/

const LoginGoogle = async () => {
  await GoogleSignin.configure({
    webClientId:
      '627697574031-5pv3iboimar55orcioltcka383a0mb07.apps.googleusercontent.com',
    forceCodeForRefreshToken: true,
    offlineAccess: true,
  });

  const user = {};

  try {
    user.currentUser = await GoogleSignin.getCurrentUser();
  } catch (error) {
    user.currentUser = false;
  }

  if (!user?.currentUser) {
    try {
      user.hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    } catch (error) {
      user.hasPlayServices = false;
    }
  }

  if (user?.hasPlayServices) {
    try {
      const data = await GoogleSignin.signIn();
      console.log(data);
      user.googleToken = data.idToken;
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        user.error = 'user cancelled the login flow';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        user.error = 'operation (e.g. sign in) is in progress already';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        user.error = 'play services not available or outdated';
      } else {
        user.error = 'some other error happened';
      }
    }
  }

  // if (user?.googleToken) {
  //   console.log(user.googleToken);
  // }
  console.log(user);
  // return user;
  // try {
  //   const {idToken} = await GoogleSignin.signIn();
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   return auth().signInWithCredential(googleCredential);
  // } catch (error) {
  //   console.log(JSON.stringify(error));
  // }
};

export default LoginGoogle;
