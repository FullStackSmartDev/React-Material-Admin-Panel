import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/assets/css/prism.css';
import 'react-phone-number-input/style.css'
import 'src/mixins/chartjs';
import 'src/mixins/prismjs';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import * as serviceWorker from 'src/serviceWorker';
import { SettingsProvider } from 'src/context/SettingsContext';
import { DialerProvider } from 'src/context/DialerContext';
import { configureStore } from 'src/store';
import { restoreSettings } from 'src/utils/settings';
import App from 'src/App';

enableES5();

const {store,persistor} = configureStore();
const settings = restoreSettings();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SettingsProvider settings={settings}>
        <DialerProvider>
          <App />
        </DialerProvider>
      </SettingsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
