import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProfile />, div);
});

//Following are tests for UserProfile page


// import { render, queryByAttribute } from 'react-testing-library';

// const getById = queryByAttribute.bind(null, 'id');

// const dom = render(<UserProfile />);
// const table = getById(dom.container, 'directory-table');


