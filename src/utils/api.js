import axios from 'axios';

export const baseURL = 'https://pycomplex.overloadlab.com.br/';
// export const baseURL = 'http://192.168.11.12:8080/';

export const http = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'},
});
let result;

export const api = {
  get: async (url, body = {}) => {
    await http
      .get(url, body)
      .then(function ({status, data}) {
        result = {status, data};
      })
      .catch(function ({response}) {
        const {status, data} = response;
        result = {status, data};
      });
    return result;
  },

  post: async (url, body = {}) => {
    await http
      .post(url, body)
      .then(function ({status, data}) {
        result = {status, data};
      })
      .catch(function ({response}) {
        const {status, data} = response;
        result = {status, data};
      });
    return result;
  },

  put: async (url, body = {}) => {
    await http
      .put(url, body)
      .then(function ({status, data}) {
        result = {status, data};
      })
      .catch(function ({response}) {
        const {status, data} = response;
        result = {status, data};
      });
    return result;
  },
};

export default api;
