import { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, Typography as T } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(4)
  },
  text: {
    fontWeight: theme.typography.fontWeightBold
  },
  spacing: {
    '&>div:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  },
  titleWrapper: {
    marginBottom: theme.spacing(1)
  }
}));

interface Props {
  marginBottom?: boolean;
  title: string;
  children: React.ReactNode;
  loading: boolean;
}

export const DetailBlock: FC<Props> = ({
  marginBottom,
  title,
  children,
  loading
}: Props) => {
  const classes = useStyles();

  return (
    <section
      className={clsx({
        [classes.margin]: marginBottom
      })}
    >
      <div className={classes.titleWrapper}>
        {loading ? (
          <Skeleton variant='text' width={title.length * 8} height={24} />
        ) : (
          <T
            variant='body1'
            color='textSecondary'
            className={classes.text}
          >{title}</T>
        )}
      </div>
      <div className={classes.spacing}>
        {children}
      </div>
    </section>
  );
};
