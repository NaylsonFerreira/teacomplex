import {Linking, Alert} from 'react-native';
import {setToken} from '../utils';
import {api, baseURL, http} from '../utils/api';

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
        .then(async function ({status, data}) {
          switch (status) {
            case 200:
              const {token} = data;

              http.defaults.headers.common.Authorization = `Token ${token}`;

              await setToken(token);
              dispatch({type: 'SIGN_IN_SUCESS', token});
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
      await setToken();
      dispatch({type: 'SIGN_OUT'});
    },

    getMe: async () => {
      const {status, data} = await api.get('me/');
      if (status === 200) {
        dispatch({type: 'UPDATE_USER', user: data});
      } else {
        await setToken();
        dispatch({
          type: 'SIGN_IN_ERROR',
          error: 'Faça login para continuar',
        });
      }
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
        .then(async function ({status, data}) {
          switch (status) {
            case 200:
              const {token} = data;

              http.defaults.headers.common.Authorization = `Token ${token}`;

              await setToken(token);
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
      console.log('buscando todos jogos');
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
    loadAllSkills: async () => {
      console.log('buscando todas habilidades');
      api
        .get(`/subclasses/PlayProfile/Habilidade/`)
        .then(function ({status, data}) {
          if (status === 200) {
            dispatch({type: 'LOAD_ALL_SKILLS', listaHabilidades: data});
            dispatch({type: 'LOAD_MY_GAMES', meusJogos: data.games});
          } else {
            dispatch({
              type: 'ERROR',
              error: data.error || 'Falha ao carregar todas as habilidades',
            });
          }
        });
    },
    loadMySkills: (id) => {
      console.log('buscando minhas habilidades');
      if (id) {
        api
          .get(`/instance/PlayProfile/Jogador_${id}/`)
          .then(function ({status, data}) {
            if (status === 200) {
              const properties = data.properties.map((prop) =>
                prop.split('Tem_habilidade').join(' ').trim(),
              );
              dispatch({type: 'LOAD_MY_SKILLS', minhasHabilidades: properties});
              dispatch({type: 'LOAD_MY_GAMES', meusJogos: data.games});
            } else {
              dispatch({
                type: 'ERROR',
                error: data.error || 'Falha ao carregar suas as habilidades',
              });
            }
          });
      }
    },
    updateSkills: ({id, skills}) => {
      console.log('atualizanndo minhas habilidades');
      dispatch({type: 'LOADING'});
      api
        .post(`/add/instance/PlayProfile/`, {
          instance_name: 'Jogador_' + id,
          class_name: 'Jogador',
          property_name: 'Tem_habilidade',
          property_values: skills,
        })
        .then(function ({status, data}) {
          switch (status) {
            case 200:
              const properties = data.properties.map((prop) =>
                prop.split('Tem_habilidade').join(' ').trim(),
              );
              dispatch({type: 'LOAD_MY_SKILLS', minhasHabilidades: properties});
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
  };
};
export default authActions;
