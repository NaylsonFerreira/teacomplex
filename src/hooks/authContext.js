import React, {useReducer, useEffect, useMemo, createContext} from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN_SUCESS':
          return {
            ...prevState,
            anonymous: false,
            user: action.user,
            loading: false,
          };
        case 'SIGN_IN_ERROR':
          return {
            ...prevState,
            anonymous: true,
            error: action.error,
            user: {},
            loading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            anonymous: true,
            userToken: null,
            user: {},
            loading: false,
          };
        case 'LOADING':
          return {
            ...prevState,
            loading: true,
          };
      }
    },
    {
      loading: false,
      anonymous: true,
      userToken: null,
      user: {
        displayName: null,
        email: '',
        emailVerified: false,
        isAnonymous: false,
        metadata: [],
        phoneNumber: null,
        photoURL: null,
        providerData: [],
        providerId: '',
        uid: '',
      },
    },
  );
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
              dispatch({type: 'SIGN_IN_ERROR', error});
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

      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
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
