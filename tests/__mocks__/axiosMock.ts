import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
axios.defaults.adapter = require('axios/lib/adapters/http');
// axios response설정
axios.interceptors.response.use(response => response.data);
const axoisMock = new MockAdapter(axios, {delayResponse: 0});
export default axoisMock;
