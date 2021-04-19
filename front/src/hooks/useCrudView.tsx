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
      case undefined: return CrudState.List;
      case 'update': return CrudState.Update;
      case 'delete': return CrudState.Delete;
      case 'create': return CrudState.Create;
      case 'view': return CrudState.View;
      default: return CrudState.List;
    }
  }, [view]);

  return {
    id: id ? Number(id) : null,
    view: updatedView
  };
};
