import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';
import store from './app/redux/store';

const appContainer: HTMLElement | null = document.getElementById('root');

if (appContainer) {
  const root: ReactDOM.Root = ReactDOM.createRoot(appContainer);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
