import { FC } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarContainer } from '@components/common';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import theme from '@theme';

import {
  MuiThemeProvider,
  CssBaseline,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core';

const className = createGenerateClassName({
  productionPrefix: 'r'
});

interface Props {
  children: React.ReactNode;
}

export const ApplicationProviders: FC<Props> = ({ children }: Props) => {
  return (
    <StylesProvider injectFirst generateClassName={className}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider
          locale='en'
          libInstance={moment}
          utils={MomentUtils}
        >
          <SnackbarContainer>
            {children}
          </SnackbarContainer>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};
