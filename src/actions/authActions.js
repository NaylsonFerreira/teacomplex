import {Linking, Alert} from 'react-native';
import {setToken} from '../utils';
import {api, baseURL} from '../utils/api';

export const authActions = (dispatch) => {
  return {
    signIn: ({email, password}) => {
      dispatch({type: 'LOADING'});

      if (!email || !password) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'Preencha os campos corretamente',
        });
        return null;
      }

      if (password?.length < 8) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'A senha muito curta',
        });
        return null;
      }

      api
        .post('login/json/', {username: email, password})
        .then(function ({status, data}) {
          switch (status) {
            case 200:
              setToken(data.token);
              dispatch({type: 'SIGN_IN_SUCESS', token: data.token});
              break;
            case 400:
              dispatch({
                type: 'SIGN_IN_ERROR',
                error: data.error || 'Credenciais inválidas',
              });
              break;
            default:
              dispatch({
                type: 'SIGN_IN_ERROR',
                error: 'Error desconhecido',
              });
          }
        });
    },

    signOut: async () => {
      dispatch({type: 'LOADING'});
      await setToken('');
      dispatch({type: 'SIGN_OUT'});
    },

    signUp: async ({email, password, password2}) => {
      dispatch({type: 'LOADING'});
      if (password?.length < 8) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'A senha muito curta',
        });
        return null;
      }

      if (password !== password2) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'As senhas precisam ser iguais',
        });
        return null;
      }

      if (!email || !password) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'Preencha os campos corretamente',
        });
        return null;
      }
      api
        .post('singup/json/', {email, password})
        .then(function ({status, data}) {
          switch (status) {
            case 200:
              setToken(data.token);
              dispatch({type: 'SIGN_IN_SUCESS', token: data.token});
              break;
            case 400:
              dispatch({
                type: 'SIGN_IN_ERROR',
                error: data.error || 'Erro ao cadastrar',
              });
              break;
            default:
              dispatch({
                type: 'SIGN_IN_ERROR',
                error: 'Error desconhecido',
              });
          }
        });
    },

    resetPassword: async () => {
      const url = baseURL + 'password_reset';
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Para recuperar sua senha acesse: ${url}`);
      }
    },
    updateUser: ({id, ...profile}) => {
      dispatch({type: 'LOADING'});
      api.put(`api/profile/${id}/`, profile).then(function ({status, data}) {
        switch (status) {
          case 200:
            dispatch({type: 'UPDATE_USER', user: data});
            break;
          case 400:
            dispatch({
              type: 'ERROR',
              error: data.error || 'Falha ao salvar',
            });
            break;
          default:
            dispatch({
              type: 'ERROR',
              error: 'Error desconhecido',
            });
        }
      });
    },
    loadAllGames: () => {
      api.get(`api/jogo/`).then(function ({status, data}) {
        if (status === 200) {
          dispatch({type: 'LOAD_ALL_GAMES', listaJogos: data});
        } else {
          dispatch({
            type: 'ERROR',
            error: data.error || 'Falha ao carregar os jogos',
          });
        }
      });
    },
  };
};
export default authActions;
