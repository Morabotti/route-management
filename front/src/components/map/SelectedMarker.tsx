import { FC } from 'react';
import { Marker } from '@react-google-maps/api';
import { useTheme } from '@material-ui/core';

interface Props {
  location: google.maps.LatLng;
}

export const SelectedMarker: FC<Props> = ({
  location
}: Props) => {
  const theme = useTheme();

  return (
    <Marker
      position={location}
      zIndex={20}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: theme.palette.primary.main
      }}
    />
  );
};
