import { memo } from 'react';
import { makeStyles, Typography as T } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrap: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
    color: '#333333'
  }
}));

interface Props {
  text?: string | null
}

export const PrimaryLoader = memo(({
  text = null
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <div>
        <T variant='h2'>Route Management</T>
        {text && (
          <T
            variant='body1'
            align='center'
            className={classes.text}
          >{text}</T>
        )}
      </div>
    </div>
  );
});
