import { FC, LazyExoticComponent } from 'react';
import { PreloadableComponent } from 'react-lazy-with-preload';
import { RouteAuthType } from '@enums';

export type RouteComponent = LazyExoticComponent<FC> | FC | PreloadableComponent<FC>;

export interface PaginationResult<T> {
  result: T[];
  length: number;
}

export interface SearchQuery {
  search?: string;
}

export interface PaginationQuery {
  limit: number;
  offset: number;
}

export interface PositionQuery {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export interface Position {
  lat: number;
  lng: number;
  zoom: number;
}

export interface Route {
  path: string;
  component: RouteComponent;
  type: RouteAuthType;
}

export interface AuthUser {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  deletedAt: string | null;
}

export interface Person {
  id: number;
  name: string;
  primaryLocations: PrimaryLocation[];
  deletedAt: null | string;
}

export interface CreatePerson {
  name: string;
  primaryLocations: LocationType[];
}

export interface LocationType {
  id: number;
  address: string;
  zip: string;
  city: string;
  latitude: number;
  longitude: number;
  primaryPersons: PrimaryLocation[];
  deletedAt: null | string;
}

export interface CreateLocation {
  address: string;
  zip: string;
  city: string;
  latitude: number;
  longitude: number;
  primaryPersons: Person[];
}

export interface PrimaryLocation {
  id: number;
  person: null | Person;
  location: null | LocationType;
}

export interface StepItem {
  id: number;
  person: Person | null;
  step: Step | null;
  deletedAt: null | string;
}

export interface Step {
  id: number;
  priority: number | null;
  location: LocationType;
  stepItems: StepItem[];
  deletedAt: null | string;
}

export interface CreateStep {
  priority: number | null;
  location: LocationType;
  stepItems: Person[];
}

export interface RouteType {
  id: number;
  startTime: null | string;
  vehicle: Vehicle;
  destination: LocationType;
  steps: Step[];
  deletedAt: null | string;
}

export interface CreateRoute {
  vehicle: Vehicle;
  destination: LocationType;
  startTime: null | string;
}

export interface CreateRouteForm {
  vehicle: null | Vehicle;
  destination: null | LocationType;
  startTime: null | string;
}

export interface Vehicle {
  id: number;
  licenseNumber: string;
  deletedAt: null | string;
}

export interface CreateVehicle {
  licenseNumber: string;
}
