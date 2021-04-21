import { useState, createContext, ReactNode, useContext, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Client, MapTool } from '@enums';
import { LocationType, Position } from '@types';
import { useDebounce } from '@hooks';
import { getMapBounds, offsetCenter } from '@utils/mapUtils';
import { useQuery } from 'react-query';
import { getLocationsWithPosition } from '@client';
import { useHistory } from 'react-router';

interface MapContext {
  map: google.maps.Map | null;
  center: google.maps.LatLng | null;
  selected: google.maps.LatLng | null;
  isLoaded: boolean;
  tool: MapTool;
  zoom: number;
  mapLocations: LocationType[];
  handleZoomChange: () => void;
  handleCenterChange: () => void;
  handleOnClick: (e: google.maps.MapMouseEvent) => void;
  onLoad: (map: google.maps.Map) => void;
  onUnload: () => void;
  onLocationChange: (set: Position) => void;
  onSelectedChange: (set: Position | null) => void;
  onToolChange: (set: MapTool) => void;
}

interface Props {
  children: ReactNode;
}

export const __MapContext = createContext<MapContext>({
  isLoaded: false,
  center: null,
  selected: null,
  map: null,
  tool: MapTool.Cursor,
  zoom: 17,
  mapLocations: [],
  handleCenterChange: () => {},
  handleZoomChange: () => {},
  handleOnClick: () => {},
  onLoad: () => {},
  onUnload: () => {},
  onLocationChange: () => {},
  onSelectedChange: () => {},
  onToolChange: () => {}
});

export const MapProvider = ({ children }: Props): JSX.Element => {
  const { push } = useHistory();
  const [center, setCenter] = useState<google.maps.LatLng | null>(null);
  const [zoom, setZoom] = useState(15);
  const [tool, setTool] = useState<MapTool>(MapTool.Cursor);
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [selected, setSelected] = useState<google.maps.LatLng | null>(null);

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
    const bounds = new window.google.maps.LatLngBounds(
      offsetCenter(
        new google.maps.LatLng(63.1092301, 21.6019174),
        loaded
      )
    );

    loaded.setCenter(bounds.getCenter());

    setCenter(bounds.getCenter());
    setMap(loaded);
  }, []);

  const onUnload = useCallback(() => {
    setMap(null);
  }, []);

  const onToolChange = useCallback((set: MapTool) => {
    if (map) {
      setTool(set);
    }
  }, [map]);

  const onLocationChange = useCallback((set: Position) => {
    if (map) {
      setCenter(offsetCenter(
        new google.maps.LatLng(set.lat, set.lng),
        map
      ));
    }
  }, [map]);

  const onSelectedChange = useCallback((set: Position | null) => {
    if (map) {
      if (!set) {
        setSelected(null);
        return;
      }

      const latLng = new google.maps.LatLng(set.lat, set.lng);
      setSelected(latLng);
      setCenter(offsetCenter(latLng, map));
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

  const handleOnClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!map) {
      return;
    }

    switch (tool) {
      case MapTool.LocationTool:
        onLocationChange({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          zoom: map.getZoom() >= 16 ? map.getZoom() : 16
        });
        setSelected(new google.maps.LatLng({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }));
        push('/rm/locations/create', {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        break;
    }
  }, [tool, push, map, onLocationChange]);

  return (
    <__MapContext.Provider
      value={{
        isLoaded,
        map,
        center,
        selected,
        tool,
        zoom,
        mapLocations: locationQuery.data || [],
        onLoad,
        onUnload,
        handleZoomChange,
        handleCenterChange,
        handleOnClick,
        onToolChange,
        onLocationChange,
        onSelectedChange
      }}
    >
      {children}
    </__MapContext.Provider>
  );
};

export const useMap = (): MapContext => useContext(__MapContext);
