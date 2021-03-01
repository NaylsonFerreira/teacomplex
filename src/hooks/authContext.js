import React, {useReducer, useEffect, useMemo, createContext} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';

firebase.auth().setLanguageCode('pt-br');

const initialState = {
  loading: false,
  anonymous: true,
  error: false,
  userToken: null,
  user: {
    displayName: null,
    email: '',
    emailVerified: false,
    phoneNumber: null,
    photoURL: null,
    providerId: '',
    uid: '',
  },
};

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN_SUCESS':
        return {
          ...prevState,
          user: action.user,
          error: false,
          loading: false,
          anonymous: false,
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
          user: action.user,
          loading: false,
        };
    }
  }, initialState);

  function onAuthStateChanged(user) {
    if (user) {
      dispatch({type: 'SIGN_IN_SUCESS', user});
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({type: 'LOADING'});
        if (data?.email && data?.password) {
          auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((response) => {
              dispatch({type: 'SIGN_IN_SUCESS', user: response});
            })
            .catch((error) => {
              dispatch({type: 'SIGN_IN_ERROR', error: 'Credenciais inválidas'});
            });
        } else {
          dispatch({
            type: 'SIGN_IN_ERROR',
            error: 'Preencha os campos corretamente',
          });
        }
      },

      signOut: async () => {
        dispatch({type: 'LOADING'});
        auth()
          .signOut()
          .then(() => dispatch({type: 'SIGN_OUT'}));
      },

      resetPassword: async (email) => {
        dispatch({type: 'LOADING'});
        if (email) {
          auth()
            .sendPasswordResetEmail(email)
            .then(() =>
              dispatch({
                type: 'ERROR',
                error: 'Enviamos instruções para seu email',
              }),
            )
            .catch(() =>
              dispatch({
                type: 'ERROR',
                error: 'Email inválido',
              }),
            );
        } else {
          dispatch({
            type: 'ERROR',
            error: 'Digite um email inválido',
          });
        }
      },

      signUp: async (data) => {
        dispatch({type: 'LOADING'});
        if (data?.password === data?.password2 && data?.password?.length >= 8) {
          auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(({user}) => {
              dispatch({type: 'SIGN_IN_SUCESS', user});
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                dispatch({
                  type: 'SIGN_IN_ERROR',
                  error: 'Esse e-mail já foi cadastrado',
                });
              }

              if (error.code === 'auth/invalid-email') {
                dispatch({
                  type: 'SIGN_IN_ERROR',
                  error: 'Credenciais inválidas',
                });
              }
            });
        } else {
          if (data?.password?.length < 8) {
            dispatch({
              type: 'SIGN_IN_ERROR',
              error: 'A senha muito curta',
            });
          } else {
            dispatch({
              type: 'SIGN_IN_ERROR',
              error: 'Preencha os campos corretamente',
            });
          }
        }
      },
      updateUser: (data) => dispatch({type: 'UPDATE_USER', user: data}),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...authContext, ...state}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
