import { LocalStorageKey } from '@enums';

import {
  AuthUser,
  CreateLocation,
  CreatePerson,
  CreateRoute,
  CreateStep,
  CreateVehicle,
  LocationType,
  PaginationQuery,
  PaginationResult,
  PositionQuery,
  Person,
  PrimaryLocation,
  RouteType,
  Step,
  Vehicle,
  SearchQuery
} from '@types';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem(LocalStorageKey.TOKEN) || ''
});

export const checkResponse = (response: Response): Response => {
  if (!response.ok) {
    throw new Error(`${response.status.toString()}: ${response.statusText}`);
  }
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchParams = (objects: any[]): string => {
  const query = new URLSearchParams();

  for (const object of objects) {
    if (!object) {
      continue;
    }

    for (const key in object) {
      if (object[key] !== null
        && object[key] !== undefined
        && object[key] !== ''
        && String(object[key]).trim() !== ''
      ) {
        query.set(key, String(object[key]));
      }
    }
  }

  return query.toString();
};

export const checkSession = (token: string): Promise<AuthUser> => fetch(
  `/api/auth/me`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const revokeSession = (): Promise<Response> => fetch(
  `/api/auth/logout`,
  {
    method: 'POST',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const getVehicles = (
  pagination: PaginationQuery,
  search: SearchQuery
): Promise<PaginationResult<Vehicle>> => fetch(
  `/api/asset/vehicle?${searchParams([pagination, search])}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getIsVehicleLicenseNumberTaken = (
  licenseNumber: string
): Promise<boolean> => fetch(
  `/api/asset/vehicle/taken/${licenseNumber}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createVehicle = (set: CreateVehicle): Promise<Vehicle> => fetch(
  `/api/asset/vehicle`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getVehicleById = (id: number): Promise<Vehicle> => fetch(
  `/api/asset/vehicle/${id}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateVehicle = (set: Vehicle): Promise<Vehicle> => fetch(
  `/api/asset/vehicle/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteVehicle = (id: number): Promise<Response> => fetch(
  `/api/asset/vehicle/${id}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const getPersons = (
  pagination: PaginationQuery,
  search: SearchQuery
): Promise<PaginationResult<Person>> => fetch(
  `/api/asset/person?${searchParams([pagination, search])}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createPerson = (set: CreatePerson): Promise<Person> => fetch(
  `/api/asset/person`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getPersonById = (id: number): Promise<Person> => fetch(
  `/api/asset/person/${id}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updatePerson = (set: Person): Promise<Person> => fetch(
  `/api/asset/person/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deletePerson = (id: number): Promise<Response> => fetch(
  `/api/asset/person/${id}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const getLocationsWithPosition = (
  position: PositionQuery
): Promise<LocationType[]> => fetch(
  `/api/location/map?${searchParams([position])}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getLocations = (
  pagination: PaginationQuery
): Promise<PaginationResult<LocationType>> => fetch(
  `/api/location?${searchParams([pagination])}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createLocation = (set: CreateLocation): Promise<LocationType> => fetch(
  `/api/location`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getLocationById = (id: number): Promise<LocationType> => fetch(
  `/api/location/${id}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateLocation = (set: LocationType): Promise<LocationType> => fetch(
  `/api/location/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteLocation = (id: number): Promise<Response> => fetch(
  `/api/location/${id}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const addLocationAsPrimary = (
  locationId: number,
  personId: number
): Promise<PrimaryLocation> => fetch(
  `/api/location/${locationId}/primary/${personId}`,
  {
    method: 'POST',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then(res => res.json());

export const deleteLocationAsPrimary = (
  locationId: number,
  personId: number
): Promise<Response> => fetch(
  `/api/location/${locationId}/primary/${personId}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const getRoutes = (): Promise<PaginationResult<RouteType>> => fetch(
  `/api/route`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getRoutesWithPosition = (
  position: PositionQuery
): Promise<RouteType[]> => fetch(
  `/api/route/map?${searchParams([position])}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createRoute = (set: CreateRoute): Promise<RouteType> => fetch(
  `/api/route`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getRouteById = (id: number): Promise<RouteType> => fetch(
  `/api/route/${id}`,
  {
    method: 'GET',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateRoute = (set: RouteType): Promise<RouteType> => fetch(
  `/api/route/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteRoute = (id: number): Promise<Response> => fetch(
  `/api/route/${id}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse);

export const createRouteStep = (
  routeId: number,
  set: CreateStep
): Promise<RouteType> => fetch(
  `/api/route/${routeId}/step`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateRouteStep = (
  routeId: number,
  set: Step
): Promise<RouteType> => fetch(
  `/api/route/${routeId}/step/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteRouteStep = (
  routeId: number,
  stepId: number
): Promise<RouteType> => fetch(
  `/api/route/${routeId}/step/${stepId}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const addStepItem = (
  stepId: number,
  personId: number
): Promise<Step> => fetch(
  `/api/route/step/${stepId}/item/${personId}`,
  {
    method: 'POST',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteStepItem = (
  stepId: number,
  personId: number
): Promise<Step> => fetch(
  `/api/step/${stepId}/item/${personId}`,
  {
    method: 'DELETE',
    headers: getHeaders()
  }
)
  .then(checkResponse)
  .then((res) => res.json());
