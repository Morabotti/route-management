import { FC } from 'react';
import { Button, List } from '@material-ui/core';
import { MapMarker, MapMarkerRadius } from 'mdi-material-ui';
import { useNavigation, usePerson } from '@hooks';
import { useCommonStyles } from '@theme';

import {
  Actions,
  ApplicationContainer,
  CenterMessage,
  ConfirmationDialog,
  CrudListItem,
  DetailBlock,
  DetailBlockText,
  DetailBlockTitle
} from '@components/common';

interface Props {
  personId: number | null;
  onBack: () => void;
}

export const ViewPerson: FC<Props> = ({
  personId,
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();
  const { onNavigation, onRoutePreload } = useNavigation();

  const {
    loading,
    person,
    deleting,
    onDelete,
    onToggleDeleting,
    onUpdate
  } = usePerson(personId);

  return (
    <>
      <ApplicationContainer
        title='Person Details'
        onBack={onBack}
        disablePadding
        actions={
          <Actions>
            <Button
              onClick={onBack}
              color='secondary'
              disableElevation
              variant='contained'
              disabled={loading || person.isLoading}
            >
              Back
            </Button>
            <Button
              onClick={onToggleDeleting(true)}
              color='inherit'
              disableElevation
              className={commonClasses.deleteButton}
              variant='contained'
              disabled={loading || person.isLoading}
            >
              Delete
            </Button>
            <Button
              color='primary'
              autoFocus
              disableElevation
              variant='contained'
              disabled={loading || person.isLoading}
              onClick={onUpdate}
            >
              Update
            </Button>
          </Actions>
        }
      >
        <div className={commonClasses.containerPadding}>
          <DetailBlock
            title='General information'
            loading={person.isLoading}
            marginBottom
          >
            <DetailBlockText
              title='Full name'
              value={person.data?.name}
              loading={person.isLoading}
            />
          </DetailBlock>
          <DetailBlockTitle
            text='Primary locations'
            loading={person.isLoading}
          />
        </div>
        <List>
          {person.isLoading ? [...Array(2)].map((e, i) => (
            <CrudListItem
              key={i}
              primaryText='loading'
              secondaryText='loading'
              icon={MapMarker}
              fetching
            />
          )) : person.data?.primaryLocations.length === 0 ? (
            <CenterMessage
              icon={MapMarkerRadius}
              text='No primary locations.'
              buttonText='Add new location'
              onClick={() => {}}
            />
          ) : person.data?.primaryLocations.map(p => {
            return (
              <CrudListItem
                key={p.id}
                primaryText={p.location?.address || ''}
                secondaryText={`${p.location?.zip} ${p.location?.city}`}
                icon={MapMarker}
                onMouseEnter={onRoutePreload('/rm/locations')}
                onClick={onNavigation(`/rm/locations/view/${p.location?.id}`)}
              />
            );
          })}
        </List>
      </ApplicationContainer>
      <ConfirmationDialog
        loading={loading}
        onClose={onToggleDeleting(false)}
        onConfirm={onDelete}
        open={deleting}
        title='Confirmation'
        children={`Are you sure that you want to delete this person?`}
      />
    </>
  );
};
