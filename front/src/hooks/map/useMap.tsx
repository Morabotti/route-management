import { useState, createContext, ReactNode, useContext, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Client, MapTool } from '@enums';
import { LocationType, Position } from '@types';
import { useDebounce } from '@hooks';
import { getMapBounds, offsetCenter } from '@utils/mapUtils';
import { useQuery } from 'react-query';
import { getLocationsWithPosition } from '@client';

interface MapContext {
  map: google.maps.Map | null;
  center: google.maps.LatLng | null;
  isLoaded: boolean;
  tool: MapTool;
  zoom: number;
  mapLocations: LocationType[];
  handleZoomChange: () => void;
  handleCenterChange: () => void;
  onLoad: (map: google.maps.Map) => void;
  onUnload: () => void;
  onLocationChange: (set: Position) => void;
  onToolChange: (set: MapTool) => () => void;
}

interface Props {
  children: ReactNode;
}

export const __MapContext = createContext<MapContext>({
  isLoaded: false,
  center: null,
  map: null,
  tool: MapTool.Cursor,
  zoom: 17,
  mapLocations: [],
  handleCenterChange: () => {},
  handleZoomChange: () => {},
  onLoad: () => {},
  onUnload: () => {},
  onLocationChange: () => {},
  onToolChange: () => () => {}
});

export const MapProvider = ({ children }: Props): JSX.Element => {
  const [center, setCenter] = useState<google.maps.LatLng | null>(null);
  const [zoom, setZoom] = useState(15);
  const [tool, setTool] = useState<MapTool>(MapTool.Cursor);
  const [map, setMap] = useState<null | google.maps.Map>(null);

  const debounced = useDebounce(center, 200);

  const locationQuery = useQuery(
    [Client.GetLocationWithPosition, {
      lat: debounced?.lat().toFixed(3),
      lng: debounced?.lng().toFixed(3)
    }],
    () => debounced === null || map === null || center === null
      ? null
      : getLocationsWithPosition(getMapBounds(debounced, map)),
    { keepPreviousData: true }
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
  });

  const onLoad = useCallback((loaded: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(offsetCenter({
      lat: 63.1092301,
      lng: 21.6019174,
      zoom
    }));

    loaded.setCenter(bounds.getCenter());

    setCenter(bounds.getCenter());
    setMap(loaded);
  }, [zoom]);

  const onUnload = useCallback(() => {
    setMap(null);
  }, []);

  const onToolChange = useCallback((set: MapTool) => () => {
    if (map) {
      setTool(set);
    }
  }, [map]);

  const onLocationChange = useCallback((set: Position) => {
    if (map) {
      setCenter(offsetCenter(set));
      setZoom(set.zoom);
    }
  }, [map]);

  const handleZoomChange = useCallback(() => {
    if (map) {
      setZoom(map.getZoom());
    }
  }, [map]);

  const handleCenterChange = useCallback(() => {
    if (map) {
      setCenter(map.getCenter());
    }
  }, [map]);

  return (
    <__MapContext.Provider
      value={{
        isLoaded,
        map,
        center,
        tool,
        zoom,
        mapLocations: locationQuery.data || [],
        onLoad,
        onUnload,
        handleZoomChange,
        handleCenterChange,
        onToolChange,
        onLocationChange
      }}
    >
      {children}
    </__MapContext.Provider>
  );
};

export const useMap = (): MapContext => useContext(__MapContext);
