import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

import {
  makeStyles,
  createStyles,
  Paper,
  Typography as T,
  SvgIconTypeMap,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '280px',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '& > div': {
      zIndex: 10
    },
    '&:hover > $hover': {
      color: '#000',
      width: '148%',
      height: '148%'
    }
  },
  icon: {
    width: '5em',
    height: '5em'
  },
  hover: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '138%',
    height: '138%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.1,
    transition: '300ms ease-in-out',
    color: colors.blueGrey[800]
  },
  text: {
    textTransform: 'uppercase'
  }
}));

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  text: string;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const HomeNavigationButton: FC<Props> = ({
  icon: Icon,
  text,
  onClick,
  onMouseEnter
}: Props) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      square
      variant='outlined'
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div>
        <Icon className={classes.icon} />
      </div>
      <div>
        <T className={classes.text} variant='h5'>{text}</T>
      </div>
      <Icon className={classes.hover} />
    </Paper>
  );
};
