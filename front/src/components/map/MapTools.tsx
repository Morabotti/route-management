import { FC, memo } from 'react';
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

  return (
    <div className={classes.background}>
      <NavigationButtonBox
        icon={CursorMove}
        onClick={onToolChange(MapTool.CURSOR)}
        title='Cursor'
        disabled={!isLoaded}
        placement='right'
        active={tool === MapTool.CURSOR}
        divider
      />
      <NavigationButtonBox
        icon={MapMarkerPlus}
        onClick={onToolChange(MapTool.LOCATION_TOOL)}
        title='Location tool'
        disabled={!isLoaded}
        active={tool === MapTool.LOCATION_TOOL}
        placement='right'
      />
    </div>
  );
});
