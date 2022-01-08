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
      main: "#3c3e66"
    },
    secondary: {
      main: "#FFF"
    },
    background: {
      default: "#F9F9F9"
    },
    text: {
      disabled: "#323232"
    }
  },
  typography: {
    fontFamily: [
      'Nunito'
    ]
  }

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
