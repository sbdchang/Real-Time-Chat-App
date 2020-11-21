import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Mainview from './Mainview';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mainview />, div);
});

it('renders contacts', () => {
  render(<Mainview />);
  expect(screen.getByText('Contacts')).toBeInTheDocument();
});