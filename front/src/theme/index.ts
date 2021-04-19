import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

const theme = createMuiTheme({
  palette,
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1250
  }
});

export { customVariables } from './customVariables';
export { useCommonStyles } from './commonStyles';

export default theme;
