import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Participant from './Participant';
import renderer from 'react-test-renderer';
//import MainView from './MainView';


//This function fails TODO
/*
test('renders participant', () => {
    const { getByLabelText } = render(<Participant />);
    const linkElement = getByText('participant');
    expect(linkElement).toBeInTheDocument();
  });
*/
//are the tests working
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

/*
it('Participant snapshot   ', () => {
  const tree = renderer.create(<Participant />).toJSON();
  expect(tree).toMatchSnapshot();
});
*/

// it('renders without crashing', () => {
//   try {
//     const div = document.createElement('div');
//     ReactDOM.render(<Participant key={1} participant={"participant"} />, div);
//   } catch (e) {
//     expect(true).toBeTruthy();
//   }
//
// });
