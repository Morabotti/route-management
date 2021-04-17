import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
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
  button: {
    height: customVariables.navigationSize,
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
    },
    '&:hover $icon': {
      color: theme.palette.primary.light
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
    transition: 'color 150ms ease-in-out, transform 300ms ease-in-out'
  },
  active: {
    color: theme.palette.primary.main
  }
}));

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  iconClassNames?: string;
  title: string;
  divider?: boolean;
  active?: boolean;
  onClick: () => void;
}

export const NavigationButtonBox: FC<Props> = ({
  icon: Icon,
  iconClassNames,
  divider,
  title,
  active,
  onClick
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title={title} placement='left'>
        <button
          onClick={onClick}
          className={clsx(classes.button, {
            [classes.active]: active
          })}
        >
          <div className={classes.paper}>
            <Icon className={clsx(classes.icon, iconClassNames)} />
          </div>
        </button>
      </Tooltip>
      {divider && (<Divider />)}
    </>
  );
};
