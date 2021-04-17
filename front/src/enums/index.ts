export enum Client {
  QUERY_VEHICLE = 'vehicle_',
  GET_VEHICLES = 'vehicle_get',
  GET_IS_VEHICLE_LICENSE_NUMBER_TAKEN = 'vehicle_get_is_license_number_taken',
  GET_VEHICLE_BY_ID = 'vehicle_get_by_id',
  QUERY_PERSON = 'person_',
  GET_PERSONS = 'person_get',
  GET_PERSON_BY_ID = 'person_get_by_id',
  QUERY_LOCATION = 'location_',
  GET_LOCATIONS = 'location_get',
  GET_LOCATIONS_WITH_POSITION = 'location_get_with_position',
  GET_LOCATION_BY_ID = 'location_get_by_id',
  QUERY_ROUTE = 'route_',
  GET_ROUTES = 'route_get',
  GET_ROUTES_WITH_POSITION = 'route_get_with_position',
  GET_ROUTE_BY_ID = 'route_get_by_id'
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
