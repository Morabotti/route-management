import { FC } from 'react';
import { useControls } from '@hooks';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Button,
  Typography as T
} from '@material-ui/core';

import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight
} from 'mdi-material-ui';

const useStyles = makeStyles(theme => createStyles({
  fixed: {
    display: 'flex',
    width: '100%'
  },
  buttonGroup: {
    display: 'contents',
    '& > button': {
      backgroundColor: theme.palette.background.paper
    }
  },
  text: {
    margin: theme.spacing('auto', 1),
    width: '100%',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(0, 0.5),
    [theme.breakpoints.down(425)]: {
      minWidth: 40
    }
  },
  last: {
    marginRight: theme.spacing(0)
  }
}));

interface Props {
  length: number;
  loading?: boolean;
}

export const ListPaginationControls: FC<Props> = ({
  length,
  loading
}: Props) => {
  const classes = useStyles();

  const {
    limit,
    offset,
    onChangeOffset,
    onNextPage,
    onPrevPage
  } = useControls();

  const min = offset + 1;
  const maxPages = Math.ceil(length / limit);
  const currentPageMax = offset + limit > length ? length : offset + limit;

  return (
    <div className={classes.fixed}>
      <div className={classes.buttonGroup}>
        <Button
          variant='outlined'
          disabled={loading || offset <= 0}
          className={classes.button}
          onClick={() => onChangeOffset(0)}
        >
          <ChevronDoubleLeft />
        </Button>
        <Button
          variant='outlined'
          disabled={loading || offset <= 0}
          className={classes.button}
          onClick={onPrevPage}
        >
          <ChevronLeft />
        </Button>
      </div>
      <T
        component='span'
        className={classes.text}
        color='textSecondary'
      >{min}-{currentPageMax} of {length}</T>
      <div className={classes.buttonGroup}>
        <Button
          variant='outlined'
          className={classes.button}
          disabled={loading || (offset + limit + 1) >= length}
          onClick={onNextPage}
        >
          <ChevronRight />
        </Button>
        <Button
          variant='outlined'
          className={clsx(classes.button, classes.last)}
          disabled={loading || (offset + limit + 1) >= length}
          onClick={() => onChangeOffset(maxPages)}
        >
          <ChevronDoubleRight />
        </Button>
      </div>
    </div>
  );
};
