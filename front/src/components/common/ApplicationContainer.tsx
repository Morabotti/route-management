import { FC } from 'react';
import { Divider, IconButton, makeStyles, Typography as T } from '@material-ui/core';
import { ChevronLeft } from 'mdi-material-ui';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100%'
  },
  padding: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5)
    }
  },
  wrapper: {
    padding: theme.spacing(3),
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
    transform: 'translate(0, -50%)'
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
        className={clsx({
          [classes.padding]: !disablePadding
        })}
      >
        {children}
      </div>
      {actions && (
        <div>
          <Divider />
          <div className={classes.wrapper}>
            {actions}
          </div>
        </div>
      )}
    </div>
  );
};
