import * as yup from 'yup';

export const createVehicleSchema = yup.object({
  licenseNumber: yup.string()
    .min(1, 'License number is too short')
    .max(9, 'License number is too long')
    .matches(/^[A-Za-z0-9|-]*$/, 'Please enter valid license number')
    .required('License number is required')
});
