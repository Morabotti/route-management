package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.VehicleRecord;

import javax.annotation.Nullable;
import java.sql.Timestamp;
import java.time.Instant;

import static fi.morabotti.routemanagement.db.tables.Vehicle.VEHICLE;

@EasyValue
@JsonDeserialize(builder = Vehicle.Builder.class)
public abstract class Vehicle {
    @EasyId
    public abstract Long getId();

    public abstract String getLicenseNumber();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_Vehicle.Builder {
        public Builder defaults(Builder builder) {
            return builder
                    .setId(0L);
        }
    }

    public static final VehicleRecordMapper<VehicleRecord> mapper
            = VehicleRecordMapper.builder(VEHICLE)
            .setIdAccessor(VEHICLE.ID)
            .setLicenseNumberAccessor(VEHICLE.LICENSE_NUMBER)
            .setDeletedAtAccessor(
                    VEHICLE.DELETED_AT,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .build();
}
