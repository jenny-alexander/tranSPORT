import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import store from './redux/store';

import App from './components/App/App';

const theme = createTheme({
  palette: {
    primary: {
      main: "#e57373"
    },
    secondary: {
      main: "#5c6bc0"
    },
    background: {
      default: "#F1FAEE"
    }
  },

});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
