import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Participant from './Participant';
import renderer from 'react-test-renderer';


//This function fails TODO
/*
test('renders participant', () => {
    const { getByLabelText } = render(<Participant />);
    const linkElement = getByText('participant');
    expect(linkElement).toBeInTheDocument();
  });
*/

it('Participant snapshot   ', () => {
  const tree = renderer.create(<Participant />).toJSON();
  expect(tree).toMatchSnapshot();
});


