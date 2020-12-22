import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Mainview from './Mainview';
import renderer from 'react-test-renderer';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mainview />, div);
});

it('Mainview renders correctly  ', () => {
  const tree = renderer.create(<Mainview />).toJSON();
  expect(tree).toMatchSnapshot();
});


// 
// it("renders an h1", function () {
//     var component = TestUtils.renderIntoDocument(
//         <MyComponent />
//     );
//
//     var h1 = TestUtils.findRenderedDOMComponentWithTag(
//        component, 'h1'
//     );
//
//     expect(h1.getDOMNode().textContent)
//         .toEqual("A title");
// });
//
