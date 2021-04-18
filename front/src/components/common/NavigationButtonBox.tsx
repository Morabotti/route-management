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
    color: 'rgba(0, 0, 0, 0.67)'
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
  const commonClasses = useCommonStyles();

  return (
    <>
      <Tooltip title={title} placement='left'>
        <button
          onClick={onClick}
          className={clsx(commonClasses.baseButton, classes.button, {
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
