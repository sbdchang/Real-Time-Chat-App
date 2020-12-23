import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Lobby from './Lobby';
//import MainView from './MainView';
import renderer from 'react-test-renderer';

/*

it('Lobby snapshot', () => {
  const tree = renderer.create(<Lobby />).toJSON();
  expect(tree).toMatchSnapshot();
});
*/

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Lobby />, div);
// });
//are the tests working
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});