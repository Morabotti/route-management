import { useMemo } from 'react';
import { useParams } from 'react-router';
import { CrudState } from '@enums';

interface CrudViewContext {
  id: number | null;
  view: CrudState;
}

export const useCrudView = (): CrudViewContext => {
  const { id, view } = useParams<{ id?: string; view?: string }>();

  const updatedView = useMemo(() => {
    switch (view) {
      case undefined: return CrudState.LIST;
      case 'update': return CrudState.UPDATE;
      case 'delete': return CrudState.DELETE;
      case 'create': return CrudState.CREATE;
      case 'view': return CrudState.VIEW;
      default: return CrudState.LIST;
    }
  }, [view]);

  return {
    id: id ? Number(id) : null,
    view: updatedView
  };
};
