import { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { DetailBlockTitle } from '@components/common';

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(4)
  },
  spacing: {
    '&>div:not(:last-child)': {
      marginBottom: theme.spacing(1)
    }
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
      <DetailBlockTitle text={title} loading={loading} />
      <div className={classes.spacing}>
        {children}
      </div>
    </section>
  );
};
