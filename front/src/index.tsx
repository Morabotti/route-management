import * as ReactDOM from 'react-dom';

import Application from '@components/Application';

const mount = document.getElementById('mount');
const render = () => {
  if (!mount) {
    console.error('No mountpoint found!');
    return;
  }

  ReactDOM.render(<Application />, mount);
};

render();

if (module.hot) {
  module.hot.accept('./components/Application', render);
}
