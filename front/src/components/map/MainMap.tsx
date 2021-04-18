import { FC, Fragment, memo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';
import { getCursorByTool } from '@utils/map-utils';
import { useMap } from '@hooks';

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

  const {
    isLoaded,
    onLoad,
    onUnload,
    center,
    zoom,
    tool,
    handleZoomChange,
    handleCenterChange
  } = useMap();

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      onLoad={onLoad}
      onUnmount={onUnload}
      zoom={zoom}
      center={center || undefined}
      onZoomChanged={handleZoomChange}
      onCenterChanged={handleCenterChange}
      mapContainerClassName={classes.hidecopyright}
      options={{
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        maxZoom: 20,
        minZoom: 6,
        draggableCursor: getCursorByTool(tool),
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
