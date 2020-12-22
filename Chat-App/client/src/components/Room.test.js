import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Room from './Room';
import renderer from 'react-test-renderer';



it('Testing here', () => {
  expect(1).toBe(1);
});


// it('Room snapshot   ', () => {
//   const tree = renderer.create(<Room />).toJSON();
//   expect(tree).toMatchSnapshot();
// });



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Room roomName={"roomName"} token={"token"} handleLogout={"handleLogout"} />, div);
// });
