import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useVehicle } from '@hooks';
import { useCommonStyles } from '@theme';

import {
  Actions,
  ApplicationContainer,
  ConfirmationDialog,
  DetailBlock,
  DetailBlockText
} from '@components/common';

interface Props {
  vehicleId: number | null;
  onBack: () => void;
}

export const ViewVehicle: FC<Props> = ({
  vehicleId,
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();

  const {
    loading,
    vehicle,
    deleting,
    onDelete,
    onToggleDeleting,
    onUpdate
  } = useVehicle(vehicleId);

  return (
    <>
      <ApplicationContainer
        title='Vehicle Details'
        onBack={onBack}
        actions={
          <Actions>
            <Button
              onClick={onBack}
              color='secondary'
              disableElevation
              variant='contained'
              disabled={loading || vehicle.isLoading}
            >
              Back
            </Button>
            <Button
              onClick={onToggleDeleting(true)}
              color='inherit'
              disableElevation
              className={commonClasses.deleteButton}
              variant='contained'
              disabled={loading || vehicle.isLoading}
            >
              Delete
            </Button>
            <Button
              color='primary'
              autoFocus
              disableElevation
              variant='contained'
              disabled={loading || vehicle.isLoading}
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
            loading={vehicle.isLoading}
          >
            <DetailBlockText
              title='License Number'
              value={vehicle.data?.licenseNumber}
              loading={vehicle.isLoading}
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
        children={`Are you sure that you want to delete this vehicle?`}
      />
    </>
  );
};
