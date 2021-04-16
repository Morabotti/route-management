package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.LocationRecord;
import fi.morabotti.routemanagement.utils.LocalDateMapper;

import javax.annotation.Nullable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static fi.morabotti.routemanagement.db.tables.Location.LOCATION;

@EasyValue
@JsonDeserialize(builder = Location.Builder.class)
public abstract class Location {
    @EasyId
    public abstract Long getId();

    public abstract String getAddress();

    public abstract String getZip();

    public abstract String getCity();

    public abstract BigDecimal getLatitude();

    public abstract BigDecimal getLongitude();

    public abstract List<PrimaryLocation> getPrimaryPersons();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_Location.Builder {
        public Builder defaults(Builder builder) {
            return builder
                    .setPrimaryPersons(Collections.emptyList());
        }
    }

    public static final LocationRecordMapper<LocationRecord> mapper
            = LocationRecordMapper.builder(LOCATION)
            .setIdAccessor(LOCATION.ID)
            .setAddressAccessor(LOCATION.ADDRESS)
            .setCityAccessor(LOCATION.CITY)
            .setZipAccessor(LOCATION.ZIP)
            .setLatitudeAccessor(LOCATION.LATITUDE)
            .setLongitudeAccessor(LOCATION.LONGITUDE)
            .setDeletedAtAccessor(
                    LOCATION.DELETED_AT,
                    LocalDateMapper::ofInstant,
                    LocalDateMapper::toLocalDate
            )
            .build();
}
