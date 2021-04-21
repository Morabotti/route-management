import { FC, useRef } from 'react';
import { InfoBox, Marker } from '@react-google-maps/api';
import { Grow, makeStyles, Paper, Typography as T } from '@material-ui/core';
import { LocationType } from '@types';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1.5),
    cursor: 'pointer',
    width: '200px',
    height: '100%'
  },
  test: {
    position: 'absolute'
  },
  address: {
    fontWeight: theme.typography.fontWeightBold
  },
  info: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

interface Props {
  location: LocationType;
  selected: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

export const LocationMapMarker: FC<Props> = ({
  location,
  selected,
  onMouseOut,
  onMouseOver
}: Props) => {
  const classes = useStyles();
  const ref = useRef<null | HTMLElement>(null);

  return (
    <Marker
      position={{ lat: location.latitude, lng: location.longitude }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <InfoBox
        position={{ lat: location.latitude, lng: location.longitude }}
        zIndex={10}
        options={{
          closeBoxURL: ``,
          enableEventPropagation: true,
          alignBottom: false,
          pixelOffset: new google.maps.Size(
            -((ref.current?.offsetWidth || 0) / 2),
            -((ref.current?.offsetHeight || 0) + 47)
          ),
          maxWidth: 200
        }}
      >
        <Grow in={selected}>
          <Paper variant='outlined' className={classes.paper} ref={ref}>
            <T
              variant='body1'
              className={classes.address}
              align='center'
              gutterBottom
            >{location.address}</T>
            <T
              variant='body2'
              className={classes.info}
              align='center'
              color='textSecondary'
            >{location.zip} {location.city}</T>
          </Paper>
        </Grow>
      </InfoBox>
    </Marker>
  );
};
