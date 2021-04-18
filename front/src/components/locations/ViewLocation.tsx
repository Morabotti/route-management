import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useCurrentLocation } from '@hooks';
import { useCommonStyles } from '@theme';

import {
  Actions,
  ApplicationContainer,
  ConfirmationDialog,
  DetailBlock,
  DetailBlockText
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

  const {
    loading,
    location,
    deleting,
    onDelete,
    onToggleDeleting,
    onUpdate
  } = useCurrentLocation(locationId);

  return (
    <>
      <ApplicationContainer
        title='Location Details'
        onBack={onBack}
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
        <div>
          <DetailBlock
            title='General information'
            loading={location.isLoading}
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
        </div>
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
