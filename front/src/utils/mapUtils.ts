import { MapTool } from '@enums';
import { PositionQuery } from '@types';

export const getCursorByTool = (tool: MapTool): undefined | string => {
  switch (tool) {
    case MapTool.Cursor:
      return undefined;
    case MapTool.LocationTool:
      return 'pointer';
  }
};

export function offsetCenter (
  latlng: google.maps.LatLng,
  map: google.maps.Map | null
): google.maps.LatLng {
  if (!map) {
    return latlng;
  }

  const scale = Math.pow(2, map.getZoom());
  const worldCoordinateCenter = map.getProjection()?.fromLatLngToPoint(latlng);
  const pixelOffset = new google.maps.Point((-300 / scale) || 0, (0 / scale) || 0);

  if (!worldCoordinateCenter) {
    return latlng;
  }

  const worldCoordinateNewCenter = new google.maps.Point(
    worldCoordinateCenter.x - pixelOffset.x,
    worldCoordinateCenter.y + pixelOffset.y
  );

  return map.getProjection()?.fromPointToLatLng(worldCoordinateNewCenter) || latlng;
}

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
