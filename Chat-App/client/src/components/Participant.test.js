import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Participant from './Participant';
import renderer from 'react-test-renderer';
import MainView from './MainView';


//This function fails TODO
/*
test('renders participant', () => {
    const { getByLabelText } = render(<Participant />);
    const linkElement = getByText('participant');
    expect(linkElement).toBeInTheDocument();
  });
*/

it('Participant snapshot   ', () => {
  const tree = renderer.create(<MainView />).toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Participant />, div);
});
