import { FC, Fragment, memo, useCallback, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';
import { getCursorByTool } from '@utils/mapUtils';
import { useMap } from '@hooks';
import { LocationMapMarker } from './LocationMapMarker';

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
  const [hover, setHover] = useState<null | number>(null);

  const {
    isLoaded,
    onLoad,
    onUnload,
    center,
    zoom,
    tool,
    mapLocations,
    handleZoomChange,
    handleCenterChange
  } = useMap();

  const onMouseOver = useCallback((id: number) => () => {
    setHover(id);
  }, []);

  const onMouseOut = useCallback(() => {
    setHover(null);
  }, []);

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
        clickableIcons: false,
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
      {mapLocations.map(location => (
        <LocationMapMarker
          key={location.id}
          location={location}
          selected={hover === location.id}
          onMouseOver={onMouseOver(location.id)}
          onMouseOut={onMouseOut}
        />
      ))}
    </GoogleMap>
  ) : (
    <Fragment />
  );
});
