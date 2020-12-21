import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Lobby from './Lobby';
import renderer from 'react-test-renderer';


it('Lobby snapshot', () => {
  const tree = renderer.create(<Lobby />).toJSON();
  expect(tree).toMatchSnapshot();
});

