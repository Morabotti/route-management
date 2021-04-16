import { FC } from 'react';
import { colors, Divider, IconButton, makeStyles, Typography as T } from '@material-ui/core';
import { ChevronLeft } from 'mdi-material-ui';
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
    padding: theme.spacing(3),
    backgroundColor: colors.grey[100],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5)
    }
  },
  wrapperBottom: {
    padding: theme.spacing(2, 3),
    backgroundColor: colors.grey[100],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5)
    }
  },
  titleBackButton: {
    position: 'relative'
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
  }
}));

interface Props {
  children: React.ReactNode;
  disablePadding?: boolean;
  actions?: React.ReactNode;
  title?: string;
  onBack?: () => void;
}

export const ApplicationContainer: FC<Props> = ({
  children,
  disablePadding = false,
  title,
  actions,
  onBack
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.fullHeight}>
      {title && (
        <div className={classes.titleBackButton}>
          {onBack && (
            <div className={classes.backButtonWrapper}>
              <IconButton onClick={onBack}>
                <ChevronLeft />
              </IconButton>
            </div>
          )}
          <div className={classes.wrapper}>
            <T variant='h4' align='center'>{title}</T>
          </div>
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
        <div>
          <Divider />
          <div className={classes.wrapperBottom}>
            {actions}
          </div>
        </div>
      )}
    </div>
  );
};
