import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import LoginGoogle from './LoginGoogle';
import { View, Text, Button } from 'native-base';

const ButtonAuth = ({ props }) => {

  return props.user.firebase_user
    ?
    <View>
      <Button onPress={() => auth().signOut()}><Text>Logout</Text></Button>
    </View>

    :
    <View>
      <Button onPress={() => LoginGoogle(props)}><Text>Login Google</Text></Button>
    </View>


}
export default ButtonAuth