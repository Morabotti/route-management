import { createStyles, makeStyles } from '@material-ui/core';

export const useCommonStyles = makeStyles(theme => createStyles({
  baseButton: {
    textDecoration: 'none',
    width: '100%',
    overflow: 'hidden',
    border: 'none',
    margin: 0,
    padding: 0,
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    textAlign: 'inherit',
    outline: 'none',
    '-webkit-font-smoothing': 'inherit',
    '-moz-osx-font-smoothing': 'inherit',
    '-webkit-appearance': 'none',
    '&::-moz-focus-inner': {
      border: 0,
      padding: 0
    }
  },
  fieldActionButton: {
    marginLeft: theme.spacing(2),
    borderRadius: 0,
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main
    }
  },
  fieldIconColor: {
    color: theme.palette.text.secondary
  },
  formField: {
    marginBottom: theme.spacing(2)
  },
  formFieldAbsoluteHelper: {
    position: 'absolute',
    bottom: -19
  },
  formFieldAbsoluteBase: {
    marginBottom: theme.spacing(1.5)
  },
  deleteButton: {
    color: '#fff',
    backgroundColor: theme.palette.error.main,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.error.dark
    }
  }
}), { index: 1 });
