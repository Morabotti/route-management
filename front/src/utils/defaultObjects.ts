import {
  CreateLocation,
  CreatePerson,
  CreateVehicle,
  LocationType,
  Person,
  PrimaryLocation,
  Vehicle
} from '@types';

export const CREATE_VEHICLE: CreateVehicle = {
  licenseNumber: ''
};

export const DEFAULT_VEHICLE: Vehicle = {
  id: 0,
  licenseNumber: '',
  deletedAt: null
};

export const CREATE_PERSON: CreatePerson = {
  name: '',
  primaryLocations: []
};

export const DEFAULT_PERSON: Person = {
  id: 0,
  name: '',
  primaryLocations: [],
  deletedAt: null
};

export const DEFAULT_PRIMARY_LOCATION: PrimaryLocation = {
  id: 0,
  location: null,
  person: null
};

export const CREATE_LOCATION: CreateLocation = {
  latitude: 0,
  longitude: 0,
  address: '',
  city: '',
  zip: '',
  primaryPersons: []
};

export const DEFAULT_LOCATION: LocationType = {
  id: 0,
  latitude: 0,
  longitude: 0,
  address: '',
  city: '',
  zip: '',
  primaryPersons: [],
  deletedAt: null
};
