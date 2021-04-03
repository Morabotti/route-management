/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db;


import fi.morabotti.routemanagement.db.tables.Location;
import fi.morabotti.routemanagement.db.tables.Person;
import fi.morabotti.routemanagement.db.tables.PrimaryLocation;
import fi.morabotti.routemanagement.db.tables.Route;
import fi.morabotti.routemanagement.db.tables.Step;
import fi.morabotti.routemanagement.db.tables.StepItem;
import fi.morabotti.routemanagement.db.tables.Vehicle;
import fi.morabotti.routemanagement.db.tables.records.LocationRecord;
import fi.morabotti.routemanagement.db.tables.records.PersonRecord;
import fi.morabotti.routemanagement.db.tables.records.PrimaryLocationRecord;
import fi.morabotti.routemanagement.db.tables.records.RouteRecord;
import fi.morabotti.routemanagement.db.tables.records.StepItemRecord;
import fi.morabotti.routemanagement.db.tables.records.StepRecord;
import fi.morabotti.routemanagement.db.tables.records.VehicleRecord;

import javax.annotation.Generated;

import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.UniqueKey;
import org.jooq.impl.Internal;


/**
 * A class modelling foreign key relationships and constraints of tables of 
 * the <code></code> schema.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.11"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // IDENTITY definitions
    // -------------------------------------------------------------------------

    public static final Identity<LocationRecord, Long> IDENTITY_LOCATION = Identities0.IDENTITY_LOCATION;
    public static final Identity<PersonRecord, Long> IDENTITY_PERSON = Identities0.IDENTITY_PERSON;
    public static final Identity<PrimaryLocationRecord, Long> IDENTITY_PRIMARY_LOCATION = Identities0.IDENTITY_PRIMARY_LOCATION;
    public static final Identity<RouteRecord, Long> IDENTITY_ROUTE = Identities0.IDENTITY_ROUTE;
    public static final Identity<StepRecord, Long> IDENTITY_STEP = Identities0.IDENTITY_STEP;
    public static final Identity<StepItemRecord, Long> IDENTITY_STEP_ITEM = Identities0.IDENTITY_STEP_ITEM;
    public static final Identity<VehicleRecord, Long> IDENTITY_VEHICLE = Identities0.IDENTITY_VEHICLE;

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<LocationRecord> KEY_LOCATION_ID = UniqueKeys0.KEY_LOCATION_ID;
    public static final UniqueKey<PersonRecord> KEY_PERSON_ID = UniqueKeys0.KEY_PERSON_ID;
    public static final UniqueKey<PrimaryLocationRecord> KEY_PRIMARY_LOCATION_ID = UniqueKeys0.KEY_PRIMARY_LOCATION_ID;
    public static final UniqueKey<RouteRecord> KEY_ROUTE_ID = UniqueKeys0.KEY_ROUTE_ID;
    public static final UniqueKey<StepRecord> KEY_STEP_ID = UniqueKeys0.KEY_STEP_ID;
    public static final UniqueKey<StepItemRecord> KEY_STEP_ITEM_ID = UniqueKeys0.KEY_STEP_ITEM_ID;
    public static final UniqueKey<VehicleRecord> KEY_VEHICLE_ID = UniqueKeys0.KEY_VEHICLE_ID;

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<PrimaryLocationRecord, PersonRecord> FK_PRIMARY_LOCATION_PERSON = ForeignKeys0.FK_PRIMARY_LOCATION_PERSON;
    public static final ForeignKey<PrimaryLocationRecord, LocationRecord> FK_PRIMARY_LOCATION_LOCATION = ForeignKeys0.FK_PRIMARY_LOCATION_LOCATION;
    public static final ForeignKey<RouteRecord, VehicleRecord> FK_ROUTE_VEHICLE = ForeignKeys0.FK_ROUTE_VEHICLE;
    public static final ForeignKey<RouteRecord, LocationRecord> FK_ROUTE_LOCATION = ForeignKeys0.FK_ROUTE_LOCATION;
    public static final ForeignKey<StepRecord, RouteRecord> FK_STEP_ROUTE = ForeignKeys0.FK_STEP_ROUTE;
    public static final ForeignKey<StepRecord, LocationRecord> FK_STEP_LOCATION = ForeignKeys0.FK_STEP_LOCATION;
    public static final ForeignKey<StepItemRecord, PersonRecord> FK_STEP_ITEM_PERSON = ForeignKeys0.FK_STEP_ITEM_PERSON;
    public static final ForeignKey<StepItemRecord, StepRecord> FK_STEP_ITEM_STEP = ForeignKeys0.FK_STEP_ITEM_STEP;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Identities0 {
        public static Identity<LocationRecord, Long> IDENTITY_LOCATION = Internal.createIdentity(Location.LOCATION, Location.LOCATION.ID);
        public static Identity<PersonRecord, Long> IDENTITY_PERSON = Internal.createIdentity(Person.PERSON, Person.PERSON.ID);
        public static Identity<PrimaryLocationRecord, Long> IDENTITY_PRIMARY_LOCATION = Internal.createIdentity(PrimaryLocation.PRIMARY_LOCATION, PrimaryLocation.PRIMARY_LOCATION.ID);
        public static Identity<RouteRecord, Long> IDENTITY_ROUTE = Internal.createIdentity(Route.ROUTE, Route.ROUTE.ID);
        public static Identity<StepRecord, Long> IDENTITY_STEP = Internal.createIdentity(Step.STEP, Step.STEP.ID);
        public static Identity<StepItemRecord, Long> IDENTITY_STEP_ITEM = Internal.createIdentity(StepItem.STEP_ITEM, StepItem.STEP_ITEM.ID);
        public static Identity<VehicleRecord, Long> IDENTITY_VEHICLE = Internal.createIdentity(Vehicle.VEHICLE, Vehicle.VEHICLE.ID);
    }

    private static class UniqueKeys0 {
        public static final UniqueKey<LocationRecord> KEY_LOCATION_ID = Internal.createUniqueKey(Location.LOCATION, "KEY_location_id", Location.LOCATION.ID);
        public static final UniqueKey<PersonRecord> KEY_PERSON_ID = Internal.createUniqueKey(Person.PERSON, "KEY_person_id", Person.PERSON.ID);
        public static final UniqueKey<PrimaryLocationRecord> KEY_PRIMARY_LOCATION_ID = Internal.createUniqueKey(PrimaryLocation.PRIMARY_LOCATION, "KEY_primary_location_id", PrimaryLocation.PRIMARY_LOCATION.ID);
        public static final UniqueKey<RouteRecord> KEY_ROUTE_ID = Internal.createUniqueKey(Route.ROUTE, "KEY_route_id", Route.ROUTE.ID);
        public static final UniqueKey<StepRecord> KEY_STEP_ID = Internal.createUniqueKey(Step.STEP, "KEY_step_id", Step.STEP.ID);
        public static final UniqueKey<StepItemRecord> KEY_STEP_ITEM_ID = Internal.createUniqueKey(StepItem.STEP_ITEM, "KEY_step_item_id", StepItem.STEP_ITEM.ID);
        public static final UniqueKey<VehicleRecord> KEY_VEHICLE_ID = Internal.createUniqueKey(Vehicle.VEHICLE, "KEY_vehicle_id", Vehicle.VEHICLE.ID);
    }

    private static class ForeignKeys0 {
        public static final ForeignKey<PrimaryLocationRecord, PersonRecord> FK_PRIMARY_LOCATION_PERSON = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_PERSON_ID, PrimaryLocation.PRIMARY_LOCATION, "fk_primary_location_person", PrimaryLocation.PRIMARY_LOCATION.PERSON_ID);
        public static final ForeignKey<PrimaryLocationRecord, LocationRecord> FK_PRIMARY_LOCATION_LOCATION = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_LOCATION_ID, PrimaryLocation.PRIMARY_LOCATION, "fk_primary_location_location", PrimaryLocation.PRIMARY_LOCATION.LOCATION_ID);
        public static final ForeignKey<RouteRecord, VehicleRecord> FK_ROUTE_VEHICLE = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_VEHICLE_ID, Route.ROUTE, "fk_route_vehicle", Route.ROUTE.VEHICLE_ID);
        public static final ForeignKey<RouteRecord, LocationRecord> FK_ROUTE_LOCATION = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_LOCATION_ID, Route.ROUTE, "fk_route_location", Route.ROUTE.DESTINATION_ID);
        public static final ForeignKey<StepRecord, RouteRecord> FK_STEP_ROUTE = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_ROUTE_ID, Step.STEP, "fk_step_route", Step.STEP.ROUTE_ID);
        public static final ForeignKey<StepRecord, LocationRecord> FK_STEP_LOCATION = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_LOCATION_ID, Step.STEP, "fk_step_location", Step.STEP.LOCATION_ID);
        public static final ForeignKey<StepItemRecord, PersonRecord> FK_STEP_ITEM_PERSON = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_PERSON_ID, StepItem.STEP_ITEM, "fk_step_item_person", StepItem.STEP_ITEM.PERSON_ID);
        public static final ForeignKey<StepItemRecord, StepRecord> FK_STEP_ITEM_STEP = Internal.createForeignKey(fi.morabotti.routemanagement.db.Keys.KEY_STEP_ID, StepItem.STEP_ITEM, "fk_step_item_step", StepItem.STEP_ITEM.STEP_ID);
    }
}
