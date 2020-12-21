//import React from 'react';
import ReactDOM from 'react-dom';
//import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders login screen', () => {
  render(<App />);
  expect(screen.getByText('Create An Account')).toBeInTheDocument();
});

it('AppTest renders correctly  ', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
