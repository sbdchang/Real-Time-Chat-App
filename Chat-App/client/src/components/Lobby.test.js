import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Lobby from './Lobby';
import MainView from './MainView';
import renderer from 'react-test-renderer';



it('Lobby snapshot', () => {
  const tree = renderer.create(<MainView />).toJSON();
  expect(tree).toMatchSnapshot();
});
