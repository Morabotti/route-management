import { MapTool } from '@enums';

export const getCursorByTool = (tool: MapTool): undefined | string => {
  switch (tool) {
    case MapTool.Cursor:
      return undefined;
    case MapTool.LocationTool:
      return 'pointer';
  }
};
