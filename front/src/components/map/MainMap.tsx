import { FC, useState, useCallback, Fragment, memo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MAP_OFFSET_X, MAP_OFFSET_Y } from '@utils/map-utils';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  hidecopyright: {
    '& .gmnoprint a, .gmnoprint span, .gm-style-cc': {
      display: 'none !important'
    },
    '& .gmnoprint div': {
      background: 'none !important'
    }
  }
}));

export const MainMap: FC = memo(() => {
  const classes = useStyles();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState<null | google.maps.Map>(null);

  const onLoad = useCallback((loaded: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 63.1092301,
      lng: 21.6019174
    });

    loaded.panBy(MAP_OFFSET_X, MAP_OFFSET_Y);
    loaded.setCenter(bounds.getCenter());

    setMap(loaded);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => console.log(map)}
      mapContainerClassName={classes.hidecopyright}
      options={{
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        zoom: 17,
        center: {
          lat: 63.1092301,
          lng: 21.6019174
        },
        styles: [{
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }]
      }}
    >
      <Marker position={{ lat: 63.1092301, lng: 21.6019174 }} />
    </GoogleMap>
  ) : (
    <Fragment />
  );
});
