import axios from 'axios';
import axiosMock from './__mocks__/axiosMock';

interface User {
  id: number;
  name: string;
  part: string;
}

// 비동기 요청 시퀀스 테스트
const postsURL = '/posts';

jest.useFakeTimers();
//jest.spyOn(global, 'setTimeout');
const mockUsers = [
  {
    id: 1,
    name: 'chaospace',
    part: 'frontend'
  }
];
describe('axiosMock동작테스트', () => {
  it('/posts요청에 대한 응답은 지정된 값이 와야 한다.', () => {
    axiosMock.onGet(postsURL).reply(200, {
      users: mockUsers
    });
    axios
      .get<{users: User[]}>(postsURL)
      .then(res => {
        console.log('응답 res', res);
        expect(res.users).toEqual(mockUsers);
      })
      .catch(e => console.log('e', e));
  });
});

//const createEmployeeURL = 'https://dummy.restapiexample.com/api/v1/create';

// const employeeList: Employee[] = [
//   {id: 1, name: 'Tiger Nixon', salary: 320800, age: 61, profile_image: ''},
//   {id: 2, name: 'Garrett Winters', salary: 170750, age: 63, profile_image: ''},
//   {id: 3, name: 'Ashton Cox', salary: 86000, age: 66, profile_image: ''},
//   {id: 4, name: 'Cedric Kelly', salary: 433060, age: 22, profile_image: ''},
//   {id: 5, name: 'Airi Satou', salary: 162700, age: 33, profile_image: ''},
//   {id: 6, name: 'Brielle Williamson', salary: 372000, age: 61, profile_image: ''},
//   {id: 7, name: 'Herrod Chandler', salary: 137500, age: 59, profile_image: ''},
//   {id: 8, name: 'Rhona Davidson', salary: 327900, age: 55, profile_image: ''},
//   {id: 9, name: 'Colleen Hurst', salary: 205500, age: 39, profile_image: ''},
//   {id: 10, name: 'Sonya Frost', salary: 103600, age: 23, profile_image: ''},
//   {id: 11, name: 'Jena Gaines', salary: 90560, age: 30, profile_image: ''},
//   {id: 12, name: 'Quinn Flynn', salary: 342000, age: 22, profile_image: ''},
//   {id: 13, name: 'Charde Marshall', salary: 470600, age: 36, profile_image: ''},
//   {id: 14, name: 'Haley Kennedy', salary: 313500, age: 43, profile_image: ''},
//   {id: 15, name: 'Tatyana Fitzpatrick', salary: 385750, age: 19, profile_image: ''},
//   {id: 16, name: 'Michael Silva', salary: 198500, age: 66, profile_image: ''},
//   {id: 17, name: 'Paul Byrd', salary: 725000, age: 64, profile_image: ''},
//   {id: 18, name: 'Gloria Little', salary: 237500, age: 59, profile_image: ''},
//   {id: 19, name: 'Bradley Greer', salary: 132000, age: 41, profile_image: ''},
//   {id: 20, name: 'Dai Rios', salary: 217500, age: 35, profile_image: ''},
//   {id: 21, name: 'Jenette Caldwell', salary: 345000, age: 30, profile_image: ''},
//   {id: 22, name: 'Yuri Berry', salary: 675000, age: 40, profile_image: ''},
//   {id: 23, name: 'Caesar Vance', salary: 106450, age: 21, profile_image: ''},
//   {id: 24, name: 'Doris Wilder', salary: 85600, age: 23, profile_image: ''}
// ];
