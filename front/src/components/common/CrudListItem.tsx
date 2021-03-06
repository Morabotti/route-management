import { FC } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { ChevronRight } from 'mdi-material-ui';
import { Skeleton } from '@material-ui/lab';

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  SvgIconTypeMap,
  Typography as T
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    '&:hover > $animation': {
      right: 24
    },
    '&:hover $icon': {
      top: '-50%'
    },
    '&:hover $text': {
      bottom: '50%'
    }
  },
  animation: {
    transition: '200ms right ease-in-out',
    right: -40
  },
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.5)
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    position: 'relative',
    overflow: 'hidden'
  },
  icon: {
    position: 'absolute',
    transition: '200ms top ease-in-out',
    top: '50%',
    transform: 'translate(0, -50%)'
  },
  text: {
    position: 'absolute',
    transition: '200ms bottom ease-in-out',
    bottom: '-100%',
    transform: 'translate(0, 50%)'
  }
}));

interface Props {
  onClick?: () => void;
  onMouseEnter?: () => void;
  primaryText: string;
  secondaryText?: string;
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  fetching?: boolean;
}

export const CrudListItem: FC<Props> = ({
  primaryText,
  secondaryText,
  icon: Icon,
  onClick,
  onMouseEnter,
  fetching
}: Props) => {
  const classes = useStyles();

  if (fetching) {
    return (
      <ListItem classes={{ root: classes.root }}>
        <ListItemAvatar>
          <Skeleton variant='circle' width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant='text' width='50%' height={24} />}
          secondary={secondaryText
            ? <Skeleton variant='text' width='30%' height={20} />
            : undefined}
        />
      </ListItem>
    );
  }

  return (
    <ListItem
      button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      classes={{
        container: classes.item,
        root: classes.root
      }}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <T className={classes.text} variant='h5'>
            {primaryText.charAt(0).toUpperCase()}
          </T>
          <Icon className={classes.icon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={primaryText}
        secondary={secondaryText}
      />
      <ListItemSecondaryAction className={classes.animation}>
        <IconButton onClick={onClick}>
          <ChevronRight />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
