package fi.morabotti.routemanagement.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easymapper.annotations.EasyId;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.db.tables.records.StepItemRecord;

import javax.annotation.Nullable;

import java.sql.Timestamp;
import java.time.Instant;

import static fi.morabotti.routemanagement.db.tables.StepItem.STEP_ITEM;

@EasyValue
@JsonDeserialize(builder = StepItem.Builder.class)
public abstract class StepItem {
    @EasyId
    public abstract Long getId();

    @Nullable
    public abstract Person getPerson();

    @Nullable
    public abstract Step getStep();

    @Nullable
    public abstract Instant getDeletedAt();

    public abstract Builder toBuilder();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_StepItem.Builder {
    }

    public static final StepItemRecordMapper<StepItemRecord> mapper
            = StepItemRecordMapper.builder(STEP_ITEM)
            .setIdAccessor(STEP_ITEM.ID)
            .setPersonAccessor(STEP_ITEM.PERSON_ID, Person::getId)
            .setStepAccessor(STEP_ITEM.STEP_ID, Step::getId)
            .setDeletedAtAccessor(
                    STEP_ITEM.DELETED_AT,
                    Timestamp::from,
                    Timestamp::toInstant
            )
            .build();
}
