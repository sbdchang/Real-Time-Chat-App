import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import renderer from 'react-test-renderer';
import VideoChat from './VideoChat';

it('Videochat Snapshot  ', () => {
    const tree = renderer.create(<VideoChat />).toJSON();
    expect(tree).toMatchSnapshot();
  });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VideoChat />, div);
});