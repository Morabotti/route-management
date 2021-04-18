import { MapTool } from '@enums';

export const getCursorByTool = (tool: MapTool): undefined | string => {
  switch (tool) {
    case MapTool.CURSOR:
      return undefined;
    case MapTool.LOCATION_TOOL:
      return 'pointer';
  }
};
