import {
  CreateLocation,
  CreatePerson,
  CreateRoute,
  CreateStep,
  LocationType,
  Person,
  PrimaryLocation,
  RouteType,
  Step,
  Vehicle
} from '@types';

const checkResponse = (res: Response): Promise<Response> => {
  if (!res.ok) {
    return res.text()
      .then((text) => {
        try {
          const jsonError = JSON.parse(text);
          if (jsonError.message) {
            return jsonError.message;
          }
          return text;
        }
        catch (_) {
          return text;
        }
      })
      .then((message) => Promise.reject(new Error(`${message} (HTTP ${res.status.toString()})`)));
  }
  return Promise.resolve(res);
};

export const getVehicles = (): Promise<Vehicle[]> => fetch(
  `/api/asset/vehicle`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createVehicle = (set: Vehicle): Promise<Vehicle> => fetch(
  `/api/asset/vehicle`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getVehicleById = (id: number): Promise<Vehicle> => fetch(
  `/api/asset/vehicle/${id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateVehicle = (set: Vehicle): Promise<Vehicle> => fetch(
  `/api/asset/vehicle/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteVehicle = (id: number): Promise<Response> => fetch(
  `/api/asset/vehicle/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse);

export const getPersons = (): Promise<Person[]> => fetch(
  `/api/asset/person`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createPerson = (set: CreatePerson): Promise<Person> => fetch(
  `/api/asset/person`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getPersonById = (id: number): Promise<Person> => fetch(
  `/api/asset/person/${id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updatePerson = (set: Person): Promise<Person> => fetch(
  `/api/asset/person/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deletePerson = (id: number): Promise<Response> => fetch(
  `/api/asset/person/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse);

export const getLocations = (): Promise<LocationType[]> => fetch(
  `/api/location`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createLocation = (set: CreateLocation): Promise<LocationType> => fetch(
  `/api/location`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getLocationById = (id: number): Promise<LocationType> => fetch(
  `/api/location/${id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateLocation = (set: LocationType): Promise<LocationType> => fetch(
  `/api/location/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteLocation = (id: number): Promise<Response> => fetch(
  `/api/location/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse);

export const getRoutes = (): Promise<RouteType[]> => fetch(
  `/api/route`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const createRoute = (set: CreateRoute): Promise<RouteType> => fetch(
  `/api/route`,
  {
    method: 'POST',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const getRouteById = (id: number): Promise<RouteType> => fetch(
  `/api/route/${id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const updateRoute = (set: RouteType): Promise<RouteType> => fetch(
  `/api/route/${set.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(set),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());

export const deleteRoute = (id: number): Promise<Response> => fetch(
  `/api/route/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
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
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json());
