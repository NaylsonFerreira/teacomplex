import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Protect = ({navigation}) => {
  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      navigation.navigate('HomeScreen');
    }
    navigation.navigate('SignInScreen');
  }

  useEffect(() => {
    console.log('Protect');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return null;
};
export default Protect;
