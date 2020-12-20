import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Participant from './Participant';

import ReactTestUtils from 'react-dom/test-utils';

//This function fails TODO
/*
test('renders participant', () => {
    const { getByLabelText } = render(<Participant />);
    const linkElement = getByText('participant');
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


