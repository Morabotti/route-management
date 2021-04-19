import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useRoute } from '@hooks';
import { useCommonStyles } from '@theme';

import {
  Actions,
  ApplicationContainer,
  ConfirmationDialog,
  DetailBlock,
  DetailBlockText
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
        <div>
          <DetailBlock
            title='General information'
            loading={route.isLoading}
          >
            <DetailBlockText
              title='Route Id'
              value={route.data?.id.toString()}
              loading={route.isLoading}
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
