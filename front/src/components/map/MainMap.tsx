import { FC, useState, useCallback, Fragment, memo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MAP_OFFSET_X, MAP_OFFSET_Y } from '@utils/map-utils';

export const MainMap: FC = memo(() => {
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
      onDragEnd={() => console.log(map)}
      options={{
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        zoom: 13,
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
