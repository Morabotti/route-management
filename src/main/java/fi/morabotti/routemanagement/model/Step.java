package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.StepRecord;

import javax.annotation.Nullable;

import java.sql.Timestamp;
import java.time.Instant;

import static fi.morabotti.routemanagement.db.tables.Step.STEP;

@EasyValue
@JsonDeserialize(builder = Step.Builder.class)
public abstract class Step {
    @EasyId
    public abstract Long getId();

    public abstract Integer getOrder();

    @Nullable
    @JsonIgnore
    public abstract Route getRoute();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract Location getLocation();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_Step.Builder {
    }

    public static final StepRecordMapper<StepRecord> mapper
            = StepRecordMapper.builder(STEP)
            .setIdAccessor(STEP.ID)
            .setOrderAccessor(STEP.ORDER)
            .setRouteAccessor(STEP.ROUTE_ID, Route::getId)
            .setLocationAccessor(STEP.LOCATION_ID, Location::getId)
            .setDeletedAtAccessor(
                    STEP.DELETED_AT,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .build();
}
