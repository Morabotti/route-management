import { FC, memo, useCallback } from 'react';
import { colors, makeStyles } from '@material-ui/core';
import { useMap } from '@hooks';
import { NavigationButtonBox } from '@components/common';
import { CursorMove, MapMarkerPlus } from 'mdi-material-ui';
import { MapTool } from '@enums';

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: colors.grey[100],
    width: '100%'
  }
}));

export const MapTools: FC = memo(() => {
  const classes = useStyles();
  const { isLoaded, tool, onToolChange } = useMap();

  const handleToolChange = useCallback((set: MapTool) => () => {
    onToolChange(set);
  }, [onToolChange]);

  return (
    <div className={classes.background}>
      <NavigationButtonBox
        icon={CursorMove}
        onClick={handleToolChange(MapTool.Cursor)}
        title='Cursor'
        disabled={!isLoaded}
        placement='right'
        active={tool === MapTool.Cursor}
        divider
      />
      <NavigationButtonBox
        icon={MapMarkerPlus}
        onClick={handleToolChange(MapTool.LocationTool)}
        title='Location tool'
        disabled={!isLoaded}
        active={tool === MapTool.LocationTool}
        placement='right'
      />
    </div>
  );
});
