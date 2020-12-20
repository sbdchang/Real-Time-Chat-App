import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAccount />, div);
});

