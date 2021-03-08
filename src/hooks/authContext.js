import React, {useReducer, useEffect, useMemo, createContext} from 'react';
import {authActions} from '../actions/authActions';
import {getToken} from '../utils';
import {api, http} from '../utils/api';

const initialState = {
  loading: false,
  error: false,
  token: null,
  user: {
    id: '',
    email: '',
    nome: '',
    cpf: '',
    apelido: '',
    foto: '',
    sobre: '',
    whatsapp: '',
    instagram: '',
    idade: '',
    genero: '',
    user: '',
  },
};

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN_SUCESS':
        return {
          ...prevState,
          token: action.token,
          error: false,
          loading: false,
        };
      case 'SIGN_IN_ERROR':
        return {
          ...initialState,
          error: action.error,
        };
      case 'SIGN_OUT':
        return initialState;
      case 'LOADING':
        return {
          ...prevState,
          loading: true,
        };
      case 'ERROR':
        return {
          ...prevState,
          error: action.error,
          loading: false,
        };
      case 'UPDATE_USER':
        return {
          ...prevState,
          error: false,
          loading: false,
          user: action.user,
        };
    }
  }, initialState);

  const getMe = () => {
    dispatch({type: 'LOADING'});
    api.get('me/').then(function ({data}) {
      dispatch({type: 'UPDATE_USER', user: data});
    });
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getToken();
      if (token) {
        http.defaults.headers.common.Authorization = `Token ${token}`;
        dispatch({type: 'SIGN_IN_SUCESS', token});
        getMe();
      } else {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'Faça login para continuar',
        });
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => authActions(dispatch), []);

  return (
    <AuthContext.Provider value={{...authContext, ...state}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
