import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import PageNavbar from './PageNavbar';
import renderer from 'react-test-renderer';

it('PageNavBar Snapshot  ', () => {
    const tree = renderer.create(<PageNavbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

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
