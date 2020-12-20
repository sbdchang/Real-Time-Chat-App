import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';
import renderer from 'react-test-renderer';

it('CreateAccount Snapshot  ', () => {
    const tree = renderer.create(<CreateAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAccount />, div);
});



