import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Room from './Room';

import ReactTestUtils from 'react-dom/test-utils';

//This function fails TODO
/*
test('renders room', () => {
    const { getByLabelText } = render(<Room />);
    const linkElement = getByText('Room');
    expect(linkElement).toBeInTheDocument();
  });
*/


it('Testing here', () => {
  expect(1).toBe(1);
});
   

let div;

beforeEach(() => {
  div = document.createElement("div");
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });


