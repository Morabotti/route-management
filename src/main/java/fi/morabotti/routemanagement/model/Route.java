package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.RouteRecord;
import fi.morabotti.routemanagement.utils.LocalDateMapper;

import javax.annotation.Nullable;
import java.time.Instant;
import java.util.List;

import static fi.morabotti.routemanagement.db.tables.Route.ROUTE;

@EasyValue
@JsonDeserialize(builder = Route.Builder.class)
public abstract class Route {
    @EasyId
    public abstract Long getId();

    @Nullable
    public abstract Instant getStartTime();

    public abstract Vehicle getVehicle();

    public abstract Location getDestination();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract List<Step> getSteps();

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
                    LocalDateMapper::ofInstant,
                    LocalDateMapper::toLocalDate
            )
            .setVehicleAccessor(ROUTE.VEHICLE_ID, Vehicle::getId)
            .setDestinationAccessor(ROUTE.DESTINATION_ID, Location::getId)
            .setDeletedAtAccessor(
                    ROUTE.DELETED_AT,
                    LocalDateMapper::ofInstant,
                    LocalDateMapper::toLocalDate
            )
            .build();
}
