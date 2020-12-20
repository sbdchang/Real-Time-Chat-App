import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import renderer from 'react-test-renderer';

it('UserProfile Snapshot  ', () => {
    const tree = renderer.create(<UserProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProfile />, div);
});

//add test for text elements

//This function fails TODO
/*
test('render jumbotron', () => {
    const { getByLabelText } = render(<UserProfile />);
    const linkElement = getByText('jumbotron');
    expect(linkElement).toBeInTheDocument();
  });
*/
let div;

beforeEach(() => {
  div = document.createElement("div");
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });


