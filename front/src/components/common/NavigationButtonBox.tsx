import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { customVariables, useCommonStyles } from '@theme';
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
    transition: 'color 150ms ease-in-out, transform 300ms ease-in-out',
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
  },
  disabled: {
    cursor: 'default',
    '& $icon': {
      color: theme.palette.text.disabled
    },
    '&:hover $icon': {
      color: theme.palette.text.disabled
    }
  }
}));

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  iconClassNames?: string;
  title: string;
  divider?: boolean;
  placement?: 'left' | 'right';
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const NavigationButtonBox: FC<Props> = ({
  icon: Icon,
  iconClassNames,
  divider,
  title,
  active,
  onClick,
  disabled = false,
  placement = 'left'
}: Props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <>
      <Tooltip title={title} placement={placement}>
        <button
          onClick={onClick}
          className={clsx(commonClasses.baseButton, classes.button, {
            [classes.active]: active,
            [classes.disabled]: disabled
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
