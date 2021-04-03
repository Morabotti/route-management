package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.RouteRecord;

import javax.annotation.Nullable;
import java.sql.Timestamp;
import java.time.Instant;

import static fi.morabotti.routemanagement.db.tables.Route.ROUTE;

@EasyValue
@JsonDeserialize(builder = Route.Builder.class)
public abstract class Route {
    @EasyId
    public abstract Long getId();

    public abstract Instant getStartTime();

    public abstract Vehicle getVehicle();

    public abstract Location getDestination();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_Route.Builder {
    }

    public static final RouteRecordMapper<RouteRecord> mapper
            = RouteRecordMapper.builder(ROUTE)
            .setIdAccessor(ROUTE.ID)
            .setStartTimeAccessor(
                    ROUTE.START_TIME,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .setVehicleAccessor(ROUTE.VEHICLE_ID, Vehicle::getId)
            .setDestinationAccessor(ROUTE.DESTINATION_ID, Location::getId)
            .setDeletedAtAccessor(
                    ROUTE.DELETED_AT,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .build();
}
