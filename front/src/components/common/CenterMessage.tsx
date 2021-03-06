import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

import {
  Typography as T,
  makeStyles,
  createStyles,
  SvgIconTypeMap,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
  container: {
    height: '400px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  wrapper: {
    maxWidth: '450px',
    width: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: theme.spacing(2, 0)
  },
  icon: {
    width: '86px',
    height: '86px',
    color: theme.palette.text.secondary
  }
}));

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  text: string;
  buttonText?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const CenterMessage: FC<Props> = ({
  icon: Icon,
  text,
  buttonText,
  onClick,
  onMouseEnter
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Icon className={classes.icon} />
        <T variant='body2' className={classes.text}>
          {text}
        </T>
        {onClick && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={onClick}
            onMouseEnter={onMouseEnter}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
