import {register,  registerValidSW, checkValidServiceWorker } from './serviceWorker';



it('renders without crashing', () => {
  const test = register("what");
  expect(true).toBeTruthy();
});


// 
// it('renders without crashing', () => {
//   const test = registerValidSW("what", "asdf");
//   expect(true).toBeTruthy();
// });


it('renders without crashing', () => {
  const test = checkValidServiceWorker("what", "asdf");
  expect(true).toBeTruthy();
});


it('renders without crashing', () => {
  const test = register();
  expect(true).toBeTruthy();
});


//
// it('Videochat Snapshot  ', () => {
//     const tree = renderer.create(<MainView />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<MainView />, div);
// });
