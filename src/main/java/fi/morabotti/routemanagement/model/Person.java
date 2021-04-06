package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.PersonRecord;

import javax.annotation.Nullable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static fi.morabotti.routemanagement.db.tables.Person.PERSON;

@EasyValue
@JsonDeserialize(builder = Person.Builder.class)
public abstract class Person {
    @EasyId
    public abstract Long getId();

    public abstract String getName();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract List<PrimaryLocation> getPrimaryLocations();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_Person.Builder {
        public Builder defaults(Builder builder) {
            return builder
                    .setPrimaryLocations(Collections.emptyList());
        }
    }

    public static final PersonRecordMapper<PersonRecord> mapper
            = PersonRecordMapper.builder(PERSON)
            .setIdAccessor(PERSON.ID)
            .setNameAccessor(PERSON.NAME)
            .setDeletedAtAccessor(
                    PERSON.DELETED_AT,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .build();
}
