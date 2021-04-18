import * as Yup from 'yup';

const zipCodeRegex = /^\d{5}$/;
const latitudeRegex = /^(\+|-)?(?:90(?:(?:\.0{1,7})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,7})?))$/;
const longitudeRegex = /^(\+|-)?(?:180(?:(?:\.0{1,7})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,7})?))$/;

export const createVehicleSchema = Yup.object({
  licenseNumber: Yup.string()
    .min(1, 'License number is too short')
    .max(9, 'License number is too long')
    .matches(/^[A-Za-z0-9|-]*$/, 'Please enter valid license number')
    .required('License number is required')
});

export const createLocationSchema = Yup.object({
  longitude: Yup.string()
    .matches(longitudeRegex, 'Please enter valid longitude')
    .required('Longitude is required'),
  latitude: Yup.string()
    .matches(latitudeRegex, 'Please enter valid latitude')
    .required('Latitude is required'),
  address: Yup.string()
    .max(254, 'Address is too long')
    .required('Address is required'),
  zip: Yup.string()
    .matches(zipCodeRegex, 'Please enter valid zip code'),
  city: Yup.string()
    .max(254, 'City name is too long')
    .required('City name is required')
});

export const createPersonSchema = Yup.object({
  name: Yup.string()
    .max(254, 'Name is too long')
    .required('Name is required')
});
