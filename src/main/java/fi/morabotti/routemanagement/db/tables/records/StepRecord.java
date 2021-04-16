/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables.records;


import fi.morabotti.routemanagement.db.tables.Step;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.TableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class StepRecord extends TableRecordImpl<StepRecord> implements Record5<Long, Integer, Long, Long, LocalDateTime> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>step.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>step.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>step.priority</code>.
     */
    public void setPriority(Integer value) {
        set(1, value);
    }

    /**
     * Getter for <code>step.priority</code>.
     */
    public Integer getPriority() {
        return (Integer) get(1);
    }

    /**
     * Setter for <code>step.route_id</code>.
     */
    public void setRouteId(Long value) {
        set(2, value);
    }

    /**
     * Getter for <code>step.route_id</code>.
     */
    public Long getRouteId() {
        return (Long) get(2);
    }

    /**
     * Setter for <code>step.location_id</code>.
     */
    public void setLocationId(Long value) {
        set(3, value);
    }

    /**
     * Getter for <code>step.location_id</code>.
     */
    public Long getLocationId() {
        return (Long) get(3);
    }

    /**
     * Setter for <code>step.deleted_at</code>.
     */
    public void setDeletedAt(LocalDateTime value) {
        set(4, value);
    }

    /**
     * Getter for <code>step.deleted_at</code>.
     */
    public LocalDateTime getDeletedAt() {
        return (LocalDateTime) get(4);
    }

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row5<Long, Integer, Long, Long, LocalDateTime> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    @Override
    public Row5<Long, Integer, Long, Long, LocalDateTime> valuesRow() {
        return (Row5) super.valuesRow();
    }

    @Override
    public Field<Long> field1() {
        return Step.STEP.ID;
    }

    @Override
    public Field<Integer> field2() {
        return Step.STEP.PRIORITY;
    }

    @Override
    public Field<Long> field3() {
        return Step.STEP.ROUTE_ID;
    }

    @Override
    public Field<Long> field4() {
        return Step.STEP.LOCATION_ID;
    }

    @Override
    public Field<LocalDateTime> field5() {
        return Step.STEP.DELETED_AT;
    }

    @Override
    public Long component1() {
        return getId();
    }

    @Override
    public Integer component2() {
        return getPriority();
    }

    @Override
    public Long component3() {
        return getRouteId();
    }

    @Override
    public Long component4() {
        return getLocationId();
    }

    @Override
    public LocalDateTime component5() {
        return getDeletedAt();
    }

    @Override
    public Long value1() {
        return getId();
    }

    @Override
    public Integer value2() {
        return getPriority();
    }

    @Override
    public Long value3() {
        return getRouteId();
    }

    @Override
    public Long value4() {
        return getLocationId();
    }

    @Override
    public LocalDateTime value5() {
        return getDeletedAt();
    }

    @Override
    public StepRecord value1(Long value) {
        setId(value);
        return this;
    }

    @Override
    public StepRecord value2(Integer value) {
        setPriority(value);
        return this;
    }

    @Override
    public StepRecord value3(Long value) {
        setRouteId(value);
        return this;
    }

    @Override
    public StepRecord value4(Long value) {
        setLocationId(value);
        return this;
    }

    @Override
    public StepRecord value5(LocalDateTime value) {
        setDeletedAt(value);
        return this;
    }

    @Override
    public StepRecord values(Long value1, Integer value2, Long value3, Long value4, LocalDateTime value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached StepRecord
     */
    public StepRecord() {
        super(Step.STEP);
    }

    /**
     * Create a detached, initialised StepRecord
     */
    public StepRecord(Long id, Integer priority, Long routeId, Long locationId, LocalDateTime deletedAt) {
        super(Step.STEP);

        setId(id);
        setPriority(priority);
        setRouteId(routeId);
        setLocationId(locationId);
        setDeletedAt(deletedAt);
    }
}
