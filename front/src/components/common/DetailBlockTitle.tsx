import { FC } from 'react';
import { makeStyles, Typography as T } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  text: {
    fontWeight: theme.typography.fontWeightBold
  },
  titleWrapper: {
    marginBottom: theme.spacing(1)
  }
}));

interface Props {
  text: string;
  loading?: boolean;
}

export const DetailBlockTitle: FC<Props> = ({
  text,
  loading
}: Props) => {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.titleWrapper}>
        <Skeleton variant='text' width={text.length * 8} height={24} />
      </div>
    );
  }

  return (
    <div className={classes.titleWrapper}>
      <T
        variant='body1'
        color='textSecondary'
        className={classes.text}
      >{text}</T>
    </div>
  );
};
