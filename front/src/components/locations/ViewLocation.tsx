import { FC } from 'react';
import { Button, IconButton, List } from '@material-ui/core';
import { useCurrentLocation, useNavigation } from '@hooks';
import { useCommonStyles } from '@theme';
import { Account, AccountOff, MapMarkerRight } from 'mdi-material-ui';

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
  locationId: number | null;
  onBack: () => void;
}

export const ViewLocation: FC<Props> = ({
  locationId,
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();
  const { onNavigation, onRoutePreload } = useNavigation();

  const {
    loading,
    location,
    deleting,
    onDelete,
    onToggleDeleting,
    onUpdate,
    onMove
  } = useCurrentLocation(locationId);

  return (
    <>
      <ApplicationContainer
        title='Location Details'
        onBack={onBack}
        disablePadding
        headerActions={
          <IconButton onClick={onMove}>
            <MapMarkerRight />
          </IconButton>
        }
        actions={
          <Actions>
            <Button
              onClick={onBack}
              color='secondary'
              disableElevation
              variant='contained'
              disabled={loading || location.isLoading}
            >
              Back
            </Button>
            <Button
              onClick={onToggleDeleting(true)}
              color='inherit'
              disableElevation
              className={commonClasses.deleteButton}
              variant='contained'
              disabled={loading || location.isLoading}
            >
              Delete
            </Button>
            <Button
              color='primary'
              autoFocus
              disableElevation
              variant='contained'
              disabled={loading || location.isLoading}
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
            loading={location.isLoading}
            marginBottom
          >
            <DetailBlockText
              title='Address'
              value={location.data?.address}
              loading={location.isLoading}
            />
            <DetailBlockText
              title='Zip Code'
              value={location.data?.zip}
              loading={location.isLoading}
            />
            <DetailBlockText
              title='City'
              value={location.data?.city}
              loading={location.isLoading}
            />
            <DetailBlockText
              title='Location'
              value={`${location.data?.latitude}, ${location.data?.longitude}`}
              loading={location.isLoading}
            />
          </DetailBlock>
          <DetailBlockTitle
            text='Primary persons'
            loading={location.isLoading}
          />
        </div>
        <List>
          {location.isLoading ? [...Array(2)].map((e, i) => (
            <CrudListItem
              key={i}
              primaryText='loading'
              icon={Account}
              fetching
            />
          )) : location.data?.primaryPersons.length === 0 ? (
            <CenterMessage
              icon={AccountOff}
              text='No primary persons.'
            />
          ) : location.data?.primaryPersons.map(p => {
            return (
              <CrudListItem
                key={p.id}
                primaryText={p.person?.name || ''}
                icon={Account}
                onMouseEnter={onRoutePreload('/rm/persons')}
                onClick={onNavigation(`/rm/persons/view/${p.person?.id}`)}
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
        children={`Are you sure that you want to delete this location?`}
      />
    </>
  );
};
