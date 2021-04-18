import { useState, createContext, ReactNode, useContext, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { MapTool } from '@enums';
import { Position } from '@types';

interface MapContext {
  map: google.maps.Map | null;
  center: google.maps.LatLng | null;
  isLoaded: boolean;
  tool: MapTool;
  zoom: number;
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
  tool: MapTool.CURSOR,
  zoom: 17,
  handleCenterChange: () => {},
  handleZoomChange: () => {},
  onLoad: () => {},
  onUnload: () => {},
  onLocationChange: () => {},
  onToolChange: () => () => {}
});

export const MapProvider = ({ children }: Props): JSX.Element => {
  const [center, setCenter] = useState<google.maps.LatLng | null>(null);
  const [zoom, setZoom] = useState(17);
  const [tool, setTool] = useState<MapTool>(MapTool.CURSOR);
  const [map, setMap] = useState<null | google.maps.Map>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
  });

  const onLoad = useCallback((loaded: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 63.1092301,
      lng: 21.6019174
    });

    loaded.setCenter(bounds.getCenter());

    setCenter(bounds.getCenter());
    setMap(loaded);
  }, []);

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
      setCenter(new google.maps.LatLng(set.lat, set.lng));
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
