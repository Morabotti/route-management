package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.PrimaryLocationRecord;

import javax.annotation.Nullable;

import static fi.morabotti.routemanagement.db.tables.PrimaryLocation.PRIMARY_LOCATION;

@EasyValue
@JsonDeserialize(builder = PrimaryLocation.Builder.class)
public abstract class PrimaryLocation {
    @EasyId
    public abstract Long getId();

    @Nullable
    public abstract Person getPerson();

    @Nullable
    public abstract Location getLocation();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_PrimaryLocation.Builder {
    }

    public static final PrimaryLocationRecordMapper<PrimaryLocationRecord> mapper
            = PrimaryLocationRecordMapper.builder(PRIMARY_LOCATION)
            .setIdAccessor(PRIMARY_LOCATION.ID)
            .setPersonAccessor(PRIMARY_LOCATION.PERSON_ID, Person::getId)
            .setLocationAccessor(PRIMARY_LOCATION.LOCATION_ID, Location::getId)
            .build();
}
