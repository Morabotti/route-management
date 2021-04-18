import { FC } from 'react';
import { colors, Divider, IconButton, makeStyles, Typography as T } from '@material-ui/core';
import { ChevronLeft } from 'mdi-material-ui';
import { customVariables } from '@theme';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  padding: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5)
    }
  },
  overflow: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1
  },
  wrapper: {
    padding: theme.spacing(0, 3),
    backgroundColor: colors.grey[100],
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5, 0)
    }
  },
  wrapperBottom: {
    padding: theme.spacing(0, 3),
    backgroundColor: colors.grey[100],
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1.5)
    }
  },
  titleSection: {
    position: 'relative',
    height: customVariables.navigationSize
  },
  bottomSection: {
    height: customVariables.navigationSize + 1
  },
  backButtonWrapper: {
    position: 'absolute',
    left: theme.spacing(3),
    top: '50%',
    transform: 'translate(0, -50%)',
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(1.5)
    }
  },
  headerActionsWrapper: {
    position: 'absolute',
    right: theme.spacing(3),
    top: '50%',
    transform: 'translate(0, -50%)',
    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(1.5)
    }
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: theme.spacing(0.5),
      height: theme.spacing(0.5)
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: '10px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.grey[500]
    },
    '&::-webkit-scrollbar-track': {
      background: '#ffffff',
      borderRadius: theme.spacing(1),
      boxShadow: 'inset 7px 10px 12px #f0f0f0'
    }
  },
  nowrap: {
    whiteSpace: 'nowrap'
  }
}));

interface Props {
  children: React.ReactNode;
  disablePadding?: boolean;
  actions?: React.ReactNode;
  headerActions?: React.ReactNode;
  title?: string;
  onBack?: () => void;
}

export const ApplicationContainer: FC<Props> = ({
  children,
  disablePadding = false,
  title,
  actions,
  headerActions,
  onBack
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.fullHeight}>
      {title && (
        <div className={classes.titleSection}>
          {onBack && (
            <div className={classes.backButtonWrapper}>
              <IconButton onClick={onBack}>
                <ChevronLeft />
              </IconButton>
            </div>
          )}
          <div className={classes.wrapper}>
            <T
              variant='h4'
              align='center'
              className={classes.nowrap}
            >{title}</T>
          </div>
          {headerActions && (
            <div className={classes.headerActionsWrapper}>
              {headerActions}
            </div>
          )}
          <Divider />
        </div>
      )}
      <div
        className={clsx(classes.overflow, classes.scrollbar, {
          [classes.padding]: !disablePadding
        })}
      >
        {children}
      </div>
      {actions && (
        <div className={classes.bottomSection}>
          <Divider />
          <div className={classes.wrapperBottom}>
            {actions}
          </div>
        </div>
      )}
    </div>
  );
};
