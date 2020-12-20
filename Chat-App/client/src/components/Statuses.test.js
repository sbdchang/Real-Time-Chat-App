import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserProfile from './Statuses';
import renderer from 'react-test-renderer';

it('UserProfile Snapshot  ', () => {
    const tree = renderer.create(<UserProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProfile />, div);
});

