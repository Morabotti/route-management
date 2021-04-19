import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Link } from 'react-router-dom';
import { customVariables } from '@theme';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  SvgIconTypeMap,
  Divider,
  Tooltip
} from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
  link: {
    height: customVariables.navigationSize,
    textDecoration: 'none',
    width: '100%',
    overflow: 'hidden',
    color: 'inherit',
    '&:hover $icon': {
      color: theme.palette.primary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: customVariables.navigationSizeMobile
    }
  },
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  },
  icon: {
    width: customVariables.navigationIconSize,
    height: customVariables.navigationIconSize,
    transition: 'color 150ms ease-in-out',
    color: 'rgba(0, 0, 0, 0.67)',
    [theme.breakpoints.down('sm')]: {
      width: customVariables.navigationIconSizeMobile,
      height: customVariables.navigationIconSizeMobile
    }
  },
  active: {
    '& $icon': {
      color: theme.palette.primary.main
    },
    '&:hover $icon': {
      color: theme.palette.primary.main
    }
  }
}));

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  to: string;
  title: string;
  divider?: boolean;
  active?: boolean;
  placement?: 'left' | 'right';
  onClick: () => void;
  onMouseEnter: () => void;
}

export const NavigationLinkBox: FC<Props> = ({
  icon: Icon,
  to,
  title,
  divider,
  active,
  onClick,
  onMouseEnter,
  placement = 'left'
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title={title} placement={placement}>
        <Link
          to={to}
          onMouseEnter={onMouseEnter}
          onClick={onClick}
          className={clsx(classes.link, {
            [classes.active]: active
          })}
        >
          <div className={classes.paper}>
            <Icon className={classes.icon} />
          </div>
        </Link>
      </Tooltip>
      {divider && (<Divider />)}
    </>
  );
};
