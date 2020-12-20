import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import Mainview from './Mainview';
import { queryByAttribute } from '@testing-library/react';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mainview />, div);
});

// describe('Testing postStatus function', () => {
//   test('random test', () => {
//     const { container } = render(<Mainview />);

//     const getById = queryByAttribute.bind(null, 'id');

//     const sc = getById(container, 'sc');

//     fireEvent.change(sc, 'what');

//     expect(sc.value).toEqual('');

//   })
// })
