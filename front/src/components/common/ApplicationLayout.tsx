import { FC } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { MainMap } from '@components/map';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, #mount': {
      height: '100%',
      width: '100%',
      margin: '0'
    }
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    height: '100%'
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  menu: {
    position: 'fixed',
    right: theme.spacing(5),
    top: theme.spacing(5),
    width: 'clamp(800px, 40vw, 950px)',
    height: `calc(100% - ${theme.spacing(10)}px)`
  },
  paper: {
    zIndex: theme.zIndex.appBar,
    height: '100%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  tools: {
    position: 'fixed',
    left: '0',
    top: '50%',
    width: '50px',
    height: `auto`,
    overflow: 'hidden',
    transform: 'translate(0,-50%)'
  },
  mockSize: {
    height: '300px'
  }
}));

interface Props {
  children: React.ReactNode;
}

const ApplicationLayout: FC<Props> = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div className={classes.background}>
        <div className={classes.map}>
          <MainMap />
        </div>
        <div className={classes.tools}>
          <Paper
            className={classes.paper}
            variant='outlined'
          >
            <div className={classes.mockSize} />
          </Paper>
        </div>
        <div className={classes.menu}>
          <Paper
            className={clsx(classes.paper)}
            variant='outlined'
          >
            {children}
          </Paper>
        </div>
      </div>
    </main>
  );
};

export default ApplicationLayout;
