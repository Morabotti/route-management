import { FC } from 'react';
import { makeStyles, Typography as T } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex'
  },
  name: {
    width: '200px',
    '& > p': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.primary
    }
  },
  data: {
    paddingLeft: theme.spacing(2),
    flexGrow: 1
  }
}));

interface Props {
  title: string;
  value?: string;
  loading: boolean;
}

export const DetailBlockText: FC<Props> = ({
  value,
  title,
  loading
}: Props) => {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.item}>
        <div className={classes.name}>
          <Skeleton variant='text' width={title.length * 8} height={24} />
        </div>
        <div className={classes.data}>
          <Skeleton variant='text' width={`${Math.random() * 75 + 25}%`} height={24} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.item}>
      <div className={classes.name}>
        <T variant='body1'>{title}</T>
      </div>
      <div className={classes.data}>
        <T variant='body1'>{value}</T>
      </div>
    </div>
  );
};
