import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('TEA-token', token);
  } catch (e) {
    console.log('Error saving token');
    return false;
  }
  console.log('Token saved successfully');
  return true;
};

const getToken = async () => {
  const token = await AsyncStorage.getItem('TEA-token');
  if (token) {
    console.log('successfully authenticated');
    return token;
  }
  console.log('Unauthenticated');
  return false;
};

export {setToken, getToken, api};
