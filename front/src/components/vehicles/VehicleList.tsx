import { FC } from 'react';
import { useVehicleList } from '@hooks';

export const VehicleList: FC = () => {
  const { vehicles } = useVehicleList();
  console.log(vehicles);

  return (
    <div>
      VEHICLE LIST<br />
      VEHICLE LIST<br />
      VEHICLE LIST<br />
    </div>
  );
};
