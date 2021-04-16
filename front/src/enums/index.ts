export enum Client {
  GET_VEHICLES = 'getVehicles',
  GET_IS_VEHICLE_LICENSE_NUMBER_TAKEN = 'getIsVehicleLicenseNumberTaken',
  CREATE_VEHICLE = 'createVehicle',
  GET_VEHICLE_BY_ID = 'getVehicleById',
  UPDATE_VEHICLE_BY_ID = 'updateVehicleById',
  DELETE_VEHICLE_BY_ID = 'deleteVehicleById',
  GET_PERSONS = 'getPersons',
  CREATE_PERSON = 'createPersons',
  GET_PERSON_BY_ID = 'getPersonById',
  UPDATE_PERSON_BY_ID = 'updatePersonById',
  DELETE_PERSON_BY_ID = 'deletePersonById',
  GET_LOCATIONS = 'getLocations',
  GET_LOCATIONS_WITH_POSITION = 'getLocationsWithPosition',
  CREATE_LOCATION = 'createLocation',
  GET_LOCATION_BY_ID = 'getLocationById',
  UPDATE_LOCATION_BY_ID = 'updateLocationById',
  DELETE_LOCATION_BY_ID = 'deleteLocationById',
  ADD_LOCATION_AS_PRIMARY = 'addLocationAsPrimary',
  REMOVE_LOCATION_AS_PRIMARY = 'deleteLocationAsPrimary',
  GET_ROUTES = 'getRoutes',
  GET_ROUTES_WITH_POSITION = 'getRoutesWithPosition',
  CREATE_ROUTE = 'createRoute',
  GET_ROUTE_BY_ID = 'getRouteById',
  UPDATE_ROUTE_BY_ID = 'updateRouteById',
  DELETE_ROUTE_BY_ID = 'deleteRouteById',
  CREATE_ROUTE_STEP = 'createRouteStep',
  UPDATE_ROUTE_STEP_BY_ID = 'updateRouteStepById',
  DELETE_ROUTE_STEP_BY_ID = 'deleteRouteStepById',
  ADD_ROUTE_STEP_ITEM = 'addRouteStepItem',
  DELETE_ROUTE_STEP_ITEM = 'deleteRouteStepItem'
}

export enum RouteAuthType {
  AUTH = 'auth',
  PUBLIC = 'public'
}

export enum LocalStorageKey {
  TOKEN = 'token',
  APPLICATION_CACHE = 'rm-cache'
}

export enum CrudState {
  LIST,
  VIEW,
  UPDATE,
  DELETE,
  CREATE
}

export enum NotificationType {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  DEFAULT = 'default'
}
