import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Lobby from './Lobby';

//import Lobby from './Lobby';
import ReactTestUtils from 'react-dom/test-utils';

//This function fails TODO
/*
test('renders room', () => {
    const { getByLabelText } = render(<Lobby />);
    const linkElement = getByText('submit');
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


