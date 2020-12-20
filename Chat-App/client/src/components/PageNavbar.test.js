import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PageNavbar from './PageNavbar';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageNavbar />, div);
});

/*
it('renders contacts', () => {
  render(<Mainview />);
  expect(screen.getByText('Contacts')).toBeInTheDocument();
});

*/
