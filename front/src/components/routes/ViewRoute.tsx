import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useRoute } from '@hooks';
import { useCommonStyles } from '@theme';
import moment from 'moment';

import {
  Actions,
  ApplicationContainer,
  ConfirmationDialog,
  DetailBlock,
  DetailBlockText,
  DetailBlockTitle
} from '@components/common';

interface Props {
  routeId: number | null;
  onBack: () => void;
}

export const ViewRoute: FC<Props> = ({
  routeId,
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();

  const {
    loading,
    route,
    deleting,
    onDelete,
    onToggleDeleting,
    onUpdate
  } = useRoute(routeId);

  return (
    <>
      <ApplicationContainer
        title='Route Details'
        onBack={onBack}
        disablePadding
        actions={
          <Actions>
            <Button
              onClick={onBack}
              color='secondary'
              disableElevation
              variant='contained'
              disabled={loading || route.isLoading}
            >
              Back
            </Button>
            <Button
              onClick={onToggleDeleting(true)}
              color='inherit'
              disableElevation
              className={commonClasses.deleteButton}
              variant='contained'
              disabled={loading || route.isLoading}
            >
              Delete
            </Button>
            <Button
              color='primary'
              autoFocus
              disableElevation
              variant='contained'
              disabled={loading || route.isLoading}
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
            loading={route.isLoading}
            marginBottom
          >
            <DetailBlockText
              title='Start date'
              value={route.data?.startTime
                ? moment(route.data.startTime).format('DD.MM.YYYY')
                : 'Not set'}
              loading={route.isLoading}
            />
            <DetailBlockText
              title='Vehicle'
              value={route.data?.vehicle.licenseNumber}
              loading={route.isLoading}
            />
            <DetailBlockText
              title='Destination'
              value={`${route.data?.destination.address}, ${route.data?.destination.zip} ${route.data?.destination.city}`}
              loading={route.isLoading}
            />
            <DetailBlockText
              title='Number of steps'
              value={`${route.data?.steps.length}`}
              loading={route.isLoading}
            />
          </DetailBlock>
          <DetailBlockTitle
            text='Route steps'
            loading={route.isLoading}
          />
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
