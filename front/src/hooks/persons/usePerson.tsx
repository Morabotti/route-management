import { useCallback, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Person } from '@types';
import { deletePerson, getPersonById } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface PersonContext {
  deleting: boolean;
  loading: boolean;
  person: UseQueryResult<Person | null>;
  onUpdate: () => void;
  onDelete: () => void;
  onToggleDeleting: (set: boolean) => () => void;
}

export const usePerson = (id: number | null): PersonContext => {
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();
  const [deleting, setDeleting] = useState(false);

  const person = useQuery(
    [Client.GET_PERSON_BY_ID, id],
    () => id === null ? null : getPersonById(id)
  );

  const { mutateAsync: deleteAsync } = useMutation(deletePerson, {
    onSuccess: (res: Response, id: number) => {
      queryClient.invalidateQueries(Client.GET_PERSONS);
      queryClient.invalidateQueries([Client.GET_PERSON_BY_ID, id], { stale: false });
    }
  });

  const onDelete = useCallback(async () => {
    if (!person.data) {
      return;
    }

    setLoading(true);
    try {
      await deleteAsync(person.data.id);
      createNotification('Successfully deleted person', NotificationType.INFO);
      setLoading(false);
      setDeleting(false);
      push(`/rm/persons`);
    }
    catch (e) {
      createNotification('Failed to delete peson', NotificationType.ERROR);
      setLoading(false);
      setDeleting(false);
    }
  }, [person.data, push, createNotification, setLoading, deleteAsync]);

  const onUpdate = useCallback(() => {
    if (!person.data) {
      return;
    }

    push(`/rm/persons/update/${person.data.id}`);
  }, [person.data, push]);

  const onToggleDeleting = useCallback((set: boolean) => () => {
    setDeleting(set);
  }, []);

  return {
    loading,
    deleting,
    person,
    onToggleDeleting,
    onUpdate,
    onDelete
  };
};