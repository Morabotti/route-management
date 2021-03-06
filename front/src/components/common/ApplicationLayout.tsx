import { FC, useCallback, useState } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { MainMap, MapTools } from '@components/map';
import { ApplicationNavigation } from '@components/common';
import { customVariables } from '@theme';
import { useHistory } from 'react-router';
import { useNavigation } from '@hooks';
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
    right: 0,
    top: 0,
    width: `calc(clamp(550px, 30vw, 750px) + ${customVariables.navigationSize}px)`,
    height: `100%`,
    display: 'flex',
    transition: '300ms width ease-in-out',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  minmized: {
    width: customVariables.navigationSize,
    [theme.breakpoints.down('sm')]: {
      width: customVariables.navigationSizeMobile
    }
  },
  navigation: {
    width: '100px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 1
  },
  paper: {
    zIndex: theme.zIndex.appBar,
    height: '100%',
    width: '100%',
    display: 'flex'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  tools: {
    position: 'fixed',
    left: '0',
    top: '50%',
    width: customVariables.navigationSize,
    height: `auto`,
    overflow: 'hidden',
    transform: 'translate(0,-50%)',
    [theme.breakpoints.down('sm')]: {
      width: customVariables.navigationSizeMobile
    }
  }
}));

interface Props {
  children: React.ReactNode;
}

const ApplicationLayout: FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const { push } = useHistory();
  const { onRoutePreload } = useNavigation();

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const onNavigation = useCallback((to: string) => (e?: React.MouseEvent) => {
    e?.preventDefault();
    push(to);
  }, [push]);

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
            square
          >
            <MapTools />
          </Paper>
        </div>
        <div
          className={clsx(classes.menu, {
            [classes.minmized]: !expanded
          })}
        >
          <Paper
            className={classes.paper}
            variant='outlined'
            square
          >
            <ApplicationNavigation
              expanded={expanded}
              onToggleExpand={toggleExpand}
              onNavigation={onNavigation}
              onRoutePreload={onRoutePreload}
            />
            <div className={classes.content}>
              {children}
            </div>
          </Paper>
        </div>
      </div>
    </main>
  );
};

export default ApplicationLayout;
