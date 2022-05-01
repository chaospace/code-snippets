import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
axios.defaults.adapter = require('axios/lib/adapters/http');
const axoisMock = new MockAdapter(axios, {delayResponse: 1000});
export default axoisMock;
