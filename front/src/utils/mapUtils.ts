import { MapTool } from '@enums';
import { Position, PositionQuery } from '@types';

export const getCursorByTool = (tool: MapTool): undefined | string => {
  switch (tool) {
    case MapTool.Cursor:
      return undefined;
    case MapTool.LocationTool:
      return 'pointer';
  }
};

export const offsetCenter = (center: Position): google.maps.LatLng => {
  return new google.maps.LatLng({
    lat: center.lat,
    lng: center.lng + 0.01
  });
};

export const getMapBounds = (
  center: google.maps.LatLng | null,
  map: google.maps.Map | null
): PositionQuery | null => {
  const bounds = map?.getBounds();

  if (!bounds) {
    return null;
  }

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  return {
    maxLat: ne.lat(),
    minLat: sw.lat(),
    maxLng: ne.lng(),
    minLng: sw.lng()
  };
};
