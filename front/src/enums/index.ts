export enum Client {
  QueryVehicle = 'vehicle_',
  GetVehicles = 'vehicle_get',
  GetIsVehicleLicenseNumberTaken = 'vehicle_get_is_license_number_taken',
  GetVehicleById = 'vehicle_get_by_id',
  QueryPerson = 'person_',
  GetPersons = 'person_get',
  GetPersonById = 'person_get_by_id',
  QueryLocation = 'location_',
  GetLocations = 'location_get',
  GetLocationWithPosition = 'location_get_with_position',
  GetLocationById = 'location_get_by_id',
  QueryRoute = 'route_',
  GetRoutes = 'route_get',
  GetRoutesWithPosition = 'route_get_with_position',
  GetRouteById = 'route_get_by_id'
}

export enum RouteAuthType {
  Auth = 'auth',
  Public = 'public'
}

export enum LocalStorageKey {
  Token = 'token',
  ApplicationCache = 'rm-cache'
}

export enum CrudState {
  List,
  View,
  Update,
  Delete,
  Create
}

export enum NotificationType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info',
  Default = 'default'
}

export enum QueryParams {
  Redirect = 'redirect',
  Params = 'params',
  Limit = 'limit',
  Offset = 'offset',
  Search = 'search'
}

export enum MapTool {
  Cursor = 'cursor',
  LocationTool = 'location-tool'
}
