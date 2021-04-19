import { useCallback, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { RouteType } from '@types';
import { deleteRoute, getRouteById } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface RouteContext {
  deleting: boolean;
  loading: boolean;
  route: UseQueryResult<RouteType | null>;
  onUpdate: () => void;
  onDelete: () => void;
  onToggleDeleting: (set: boolean) => () => void;
}

export const useRoute = (id: number | null): RouteContext => {
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();
  const [deleting, setDeleting] = useState(false);

  const route = useQuery(
    [Client.GetRouteById, id],
    () => id === null ? null : getRouteById(id)
  );

  const { mutateAsync: deleteAsync } = useMutation(deleteRoute, {
    onSuccess: (res: Response, route: RouteType) => {
      queryClient.invalidateQueries(Client.GetRoutes);
      queryClient.invalidateQueries(Client.GetRoutesWithPosition);
      queryClient.invalidateQueries([Client.GetRouteById, route.id], { stale: false });
    }
  });

  const onDelete = useCallback(async () => {
    if (!route.data) {
      return;
    }

    setLoading(true);
    try {
      await deleteAsync(route.data);
      createNotification('Successfully deleted route', NotificationType.Info);
      setLoading(false);
      setDeleting(false);
      push(`/rm/routes`);
    }
    catch (e) {
      createNotification('Failed to delete route', NotificationType.Error);
      setLoading(false);
      setDeleting(false);
    }
  }, [route.data, push, createNotification, setLoading, deleteAsync]);

  const onUpdate = useCallback(() => {
    if (!route.data) {
      return;
    }

    push(`/rm/routes/update/${route.data.id}`);
  }, [route.data, push]);

  const onToggleDeleting = useCallback((set: boolean) => () => {
    setDeleting(set);
  }, []);

  return {
    loading,
    deleting,
    route,
    onToggleDeleting,
    onUpdate,
    onDelete
  };
};
