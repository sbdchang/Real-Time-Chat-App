import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Participant from './Participant';

import ReactTestUtils from 'react-dom/test-utils';

//This function fails TODO
test('renders participant', () => {
    const { getByLabelText } = render(<Participant />);
    const linkElement = getByText('submit');
    expect(linkElement).toBeInTheDocument();
  });

let div;

beforeEach(() => {
  div = document.createElement("div");
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });


