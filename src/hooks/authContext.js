import React, {useReducer, useEffect, useMemo, createContext} from 'react';
import {authActions} from '../actions/authActions';
import {getToken, setToken} from '../utils';
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
  listaJogos: [],
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
      case 'LOAD_ALL_GAMES':
        return {
          ...prevState,
          error: false,
          loading: false,
          listaJogos: action.listaJogos,
        };
    }
  }, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({type: 'LOADING'});
      const token = await getToken();
      if (token) {
        http.defaults.headers.common.Authorization = `Token ${token}`;
      }

      const {status, data} = await api.get('me/');
      if (status === 200) {
        dispatch({type: 'SIGN_IN_SUCESS', token});
        dispatch({type: 'UPDATE_USER', user: data});
      } else {
        await setToken();
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
